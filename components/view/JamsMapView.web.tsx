import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, OverlayViewF } from "@react-google-maps/api";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { router } from "expo-router";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import UserManager from "@/manager/UserManager";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";
import SearchFiltersView from "./SearchFiltersView";
import SpinnerView from "./SpinnerView";
import MapManager from "@/manager/MapManager";
import MapLegendView from "./MapLegendView";
import DataManager from "@/manager/DataManager";
import i18n from "@/translation/i18n";
import SectionManager from "@/manager/SectionManager";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const places = [
  { id: 1, name: "Marker One", position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: "Marker Two", position: { lat: 37.7849, lng: -122.4094 } },
];

const JamsMapView = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [initialRegion, setInitialRegion] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const getInitialRegion = () => {
    let latitude: any = Config.defaultLocation.latitude;
    let longitude: any = Config.defaultLocation.longitude;
    let latitudeDelta: any = 0.2;
    let longitudeDelta: any = 0.2;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude;
    }

    return {
      lat: latitude,
      lng: longitude,
      //latitudeDelta: latitudeDelta,
      //longitudeDelta: longitudeDelta,
    };
  };

  const getTabResults = (key: string) => {
    let results: any = {
      ...searchResults,
      ...{
        [key]: SearchManager.getTabResults(key, searchState.currentTab, searchResults)
      },
    };

    return results[key];
  };

  const getMarkerPosition = (item: any) => {
    const lat = parseFloat(item?.geolocation_latitude);
    const lng = parseFloat(item?.geolocation_longitude);

    return { lat, lng };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      let pixelOffset: number = 40;
      let onButtonPress = (row: any) => {
        let params: any = {
          jamId: item?.id,
          title: i18n.t('Jam'),
          itemData: JSON.stringify(row?.item),
          disableInfiniteScroll: true,
        };

        router.push({
          pathname: '/public-jam', 
          params: params,
        });
      };


      return (
        <React.Fragment key={item.id}>
          <OverlayViewF
            position={getMarkerPosition(item)}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -height,
            })}
          >
            <div onClick={() => setSelectedPlace(item)}>
              {MapManager.renderMarker(item)}
            </div>
          </OverlayViewF>

          {selectedPlace?.id === item.id && (
            <InfoWindow
              position={getMarkerPosition(item)}
              onCloseClick={() => setSelectedPlace(null)}
              options={{
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(0, -pixelOffset),
              }}
            >
              <div>
                <div>{UserManager.getProfileDisplayName(item)}</div>
                <div>{item?.profile_name}</div>
                <div>{UserManager.getProfileTypeLabel(item?.profile_type)}</div>
                <div>{DataManager.truncateText(item?.profile_description, 55)}</div>
                <button onClick={() => onButtonPress(item)}>{i18n.t('Show more')}</button>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!searchState.currentTab) {
          dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
        }

        setInitialRegion(getInitialRegion());
      }

      setCurrentLocation(await UserManager.getLocation());
    })();
  }, [searchState, searchTabs, isLoaded]);

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.screenContent, styles.container]}>

      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />

      <SearchFiltersView />

      <GoogleMap
        mapContainerStyle={styles.map}
        center={initialRegion}
        zoom={7}
        options={{
          //styles: Layout.mapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {SearchManager.isJamTab(searchState.currentTab) && getTabResults('jam').map((item: any) => renderMarker(item))}
        {SearchManager.isProfileTab(searchState.currentTab) && getTabResults('profile').map((item: any) => renderMarker(item))}
        {SearchManager.isProjectTab(searchState.currentTab) && getTabResults('project').map((item: any) => renderMarker(item))}
      </GoogleMap>

      <MapLegendView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: Layout.space.base,
    width: '100%',
    flexGrow: 1,
    backgroundColor: Layout.colors.white,
  },
  map: {
    flex: 1,
  },
});

export default JamsMapView;
