import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, OverlayViewF } from "@react-google-maps/api";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";
import SpinnerView from "./SpinnerView";
import MapManager from "@/manager/MapManager";
import MapLegendView from "./MapLegendView";
import LoadingMoreView from "./LoadingMoreView";

const zoomLevel: number = 7;
const pixelOffset: number = 40;

const JamsMapView = () => {
  const dispatch = useDispatch();
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [listData, setListData] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [initialRegion, setInitialRegion] = useState<any>(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const getInitialRegion = () => {
    let lat: any = Config.defaultLocation.latitude;
    let lng: any = Config.defaultLocation.longitude;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }

    return { lat: lat, lng: lng };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <React.Fragment key={item.id}>
          <OverlayViewF
            position={MapManager.getMarkerPosition(item)}
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

          {selectedPlace && selectedPlace?.id === item.id && (
            <InfoWindow
              position={MapManager.getMarkerPosition(selectedPlace)}
              onCloseClick={() => setSelectedPlace(null)}
              options={{
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(0, -pixelOffset),
              }}
            >
              {MapManager.renderMarkerCallout(item)}
            </InfoWindow>
          )}
        </React.Fragment>
      );
    }
  };

  const fetchListData = async () => {
    setIsFetching(true);
    setListData(await SearchManager.loadResults(searchState.currentTab, 1, Config.maxMapResults));
    setIsFetching(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        await fetchListData();
        setInitialRegion(getInitialRegion());
      }
    })();
  }, [isLoaded]);

  useEffect(() => {
    if (!searchState.currentTab) {
      dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
    }
  }, [searchState, searchTabs]);

  useEffect(() => {
    if (SearchManager.shouldReload(prevSearchState.current, searchState)) {
      fetchListData();
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

      <GoogleMap
        mapContainerStyle={styles.map}
        center={initialRegion}
        zoom={zoomLevel}
        options={{
          styles: Layout.mapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {(listData || []).map((item: any) => renderMarker(item))}
      </GoogleMap>

      <MapLegendView />

      {isLoaded && isFetching && <LoadingMoreView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: Layout.space.base,
    width: '100%',
    height: '100%',
    flexShrink: 1,
    backgroundColor: Layout.colors.white,
  },
  map: {
    flex: 1,
  },
});

export default JamsMapView;
