import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCurrentTab } from "@/redux/slices/SearchSlice";
import { WebView } from "react-native-webview";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import UserManager from "@/manager/UserManager";
import SearchFiltersView from "./SearchFiltersView";
import SearchManager from "@/manager/SearchManager";
import TabsView from "./TabsView";
import MapManager from "@/manager/MapManager";
import MapLegendView from "./MapLegendView";

const JamsMapView = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();

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

  const getMarkerCoordinate = (item: any) => {
    const lat = parseFloat(item?.geolocation_latitude);
    const lng = parseFloat(item?.geolocation_longitude);

    return {
      latitude: lat,
      longitude: lng,
    };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          coordinate={getMarkerCoordinate(item)}
        >
          {MapManager.renderMarker(item)}
        </Marker>
      );
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>
          html, body, #root {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
        </style>
        <script src="https://maps.googleapis.com/maps/api/js?key=${Config.mapApiKey}"></script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          function initMap() {
            const map = new google.maps.Map(document.getElementById("root"), {
              center: { lat: 6.1692433, lng: 1.2220817 },
              zoom: 18,
            });
            
            new google.maps.Marker({
              map: map,
              position: { lat: 6.1692433, lng: 1.2220817 },
              title: "hello",
            });
          }

          window.onload = initMap;
        </script>
      </body>
    </html>
  `;

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

  useEffect(() => {
    if (prevSearchState.current?.currentResults !== searchState.currentResults) {
      setSearchResults(JSON.parse(searchState.currentResults) || {});

      prevSearchState.current = searchState;
    }
  }, [searchState]);

  if (!currentLocation?.latitude || !currentLocation?.longitude || !isLoaded) return <SpinnerView />;

  return (
    <View style={styles.container}>
      <TabsView
        tabs={searchTabs}
        currentTab={searchState.currentTab}
        onItemPress={(tabId: string) => dispatch(setCurrentTab(tabId))}
      />

      <SearchFiltersView />

      <View style={styles.map}>
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.map}
        />
      </View>
    </View>
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
