import MapView , { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";

type Props = {
  idArray?: any;
};

const JamsMapView = ({ idArray }: Props) => {
  const mapRef = useRef<any>();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const searchState: any = useSelector((state: any) => state.search);
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

  const getListData = () => {
    let data: any [] = JSON.parse(searchState.currentResults)?.jam || [];

    if (idArray?.length > 0) {
      data = data.filter((o: any) => idArray.includes(o.id));
    }

    return data;
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
    })();
  }, [searchState]);

  if (!currentLocation?.latitude || !currentLocation?.longitude) return <SpinnerView />;
  
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT} 
          initialRegion={getInitialRegion()}
          customMapStyle={Layout.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {getListData().map((item: any) => renderJamMarker(item))}
        </MapView>
      </View>
    </TouchableWithoutFeedback>
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

export default JamsMapView;
