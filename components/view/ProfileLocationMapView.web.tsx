import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, OverlayViewF, OverlayView } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Config } from "@/constants/Config";
import { Layout } from "@/constants/Layout";
import UserManager from "@/manager/UserManager";
import SpinnerView from "./SpinnerView";
import MapManager from "@/manager/MapManager";

type Props = {
  itemData?: any;
};

const zoomLevel: number = 7;
const pixelOffset: number = 40;

const ProfileLocationMapView = ({ itemData }: Props) => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const getInitialRegion = () => {
    let lat: any = Config.defaultLocation.latitude;
    let lng: any = Config.defaultLocation.longitude;

    if (itemData?.geolocation_latitude && itemData?.geolocation_longitude) {
      lat = parseFloat(itemData.geolocation_latitude);
      lng = parseFloat(itemData.geolocation_longitude); 
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
  
  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
    })();
  }, []);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.screenContent, styles.container]}>
      <GoogleMap
        mapContainerStyle={styles.map}
        center={getInitialRegion()}
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
        {renderMarker(itemData)}
      </GoogleMap>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    width: '100%',
    flexGrow: 1,
    backgroundColor: Layout.colors.white,
  },
  map: {
    flex: 1,
  },
});

export default ProfileLocationMapView;
