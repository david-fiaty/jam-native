import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Callout } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";
import MapManager from "@/manager/MapManager";

type Props = {
  itemData?: any;
};

const ProfileLocationMapView = ({ itemData }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getInitialRegion = () => {
    let latitude: any = Config.defaultLocation.latitude;
    let longitude: any = Config.defaultLocation.longitude;
    let latitudeDelta: any = 0.2;
    let longitudeDelta: any = 0.2;
    
    if (itemData?.geolocation_latitude && itemData?.geolocation_longitude) {
      latitude = parseFloat(itemData.geolocation_latitude);
      longitude = parseFloat(itemData.geolocation_longitude); 
    }

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());

      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded || !currentLocation?.latitude || !currentLocation?.longitude) return <SpinnerView />;
  
  return (
    <BoxView 
      direction="column" 
      align="flex-start" 
      justify="flex-start" 
      style={[Layout.screenContent, styles.container]}
    >
      <TouchableWithoutFeedback>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            customMapStyle={Layout.mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={getInitialRegion()}
          >
            {MapManager.renderNativeMarker(itemData)}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base*1.5,
    position: 'relative',
  },
  confirmButton: {
    bottom: '9%',
    position: 'absolute',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  map: {
    flex: 1,
  },
});

export default ProfileLocationMapView;
