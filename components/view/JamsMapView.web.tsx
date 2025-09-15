import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, InfoWindow, OverlayViewF } from "@react-google-maps/api";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
  //const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const searchState: any = useSelector((state: any) => state.search, shallowEqual);
  const prevSearchState: any = useRef(null);
  const searchTabs: any[] = SearchManager.getSearchTabs();
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

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

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!searchState.currentTab) {
          dispatch(setCurrentTab((searchTabs.find((o: any) => o?.default === true))?.id));
        }

        //setIsLoaded(true);
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
    <GoogleMap 
      mapContainerStyle={containerStyle} 
      //center={center} 
      center={getInitialRegion()}
      zoom={7}>
      {places.map((place) => (
        <React.Fragment key={place.id}>
          <OverlayViewF
            position={place.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() => setSelectedPlace(place)}
              style={{
                background: "white",
                border: "2px solid #333",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              📍
            </div>
          </OverlayViewF>

          {/* Callout / InfoWindow */}
          {selectedPlace?.id === place.id && (
            <InfoWindow
              position={place.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{place.name}</h4>
                <p>Custom info here</p>
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}

export default JamsMapView;
