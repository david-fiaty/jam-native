import MapView , { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";

const JamsMapView = () => {
  const mapRef = useRef<any>();
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchState: any = useSelector((state: any) => state.search);
  const searchTabs: any[] = SearchManager.getSearchTabs();
  const markerImage = require('@/assets/images/logo-55.png');
  
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
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
  };

  const getMarkerCoordinate = (item: any) => {
    return {
      latitude: parseFloat(item?.geolocation_latitude),
      longitude: parseFloat(item?.geolocation_longitude),
    };
  };

  const getMarkerTitle = (item: any) => {
    return item?.title || i18n.t('No title available');
  };

  const getMarkerDescription = (item: any) => {
    return item?.caption || '';
  };

  const renderJamMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          title={getMarkerTitle(item)}
          description={getMarkerDescription(item)}
          coordinate={getMarkerCoordinate(item)}
          icon={markerImage} 
        />
      );
    }

    return null;
  };

  const getTabResults = (key: string) => {
    let data: any = JSON.parse(searchState.currentResults) || {};
    let results: any[] = SearchManager.getTabResults(key, searchState.currentTab, data);

    return results || [];
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!searchState.currentTab) {
          dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
        }

        setIsLoaded(true);
      }

      setCurrentLocation(await UserManager.getLocation());
    })();
  }, [searchState, searchTabs, isLoaded]);

  if (!currentLocation?.latitude || !currentLocation?.longitude || !isLoaded) return <SpinnerView />;
  
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
          
        <TabsView
          tabs={searchTabs}
          currentTab={searchState.currentTab}
          onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
        />

        <SearchFiltersView />

        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT} 
          mapType="standard"
          initialRegion={getInitialRegion()}
          //customMapStyle={Layout.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {getTabResults(searchState.currentTab).map((item: any) => renderJamMarker(item))}
        </MapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
