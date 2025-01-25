import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import RNMapView , { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Callout } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import i18n from "@/translation/i18n";
import SearchManager from "@/manager/SearchManager";

type Props = BaseProps & {
  idArray?: any;
};

const JamsMapView = ({ idArray }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>({});
  const searchState = useSelector((state: any) => state.search);

  const mapRef = useRef<any>();
  const markerImage = require('@/assets/images/logo-55.png');
  
  const getInitialRegion = () => {
    let latitude = currentLocation?.coords?.latitude || Config.defaultLocation.latitude;
    let longitude = currentLocation?.coords?.longitude || Config.defaultLocation.longitude;
    let latitudeDelta = 0.16;
    let longitudeDelta = latitudeDelta * (DeviceManager.window.width/DeviceManager.window.height);

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

  useEffect(() => {
    (async () => {
      setCurrentLocation(await DeviceManager.getLocation());
      setSearchData(await SearchManager.getResult(searchState.value));
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <TouchableWithoutFeedback>
      <View style={[Layout.screenContent, styles.container]}>
        <RNMapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE} // Todo - Handle provider IOS
          initialRegion={getInitialRegion()}
          customMapStyle={Layout.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {searchData?.jam?.map((item: any) => renderJamMarker(item))}
        </RNMapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base*2,
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 20,
  }
});

export default JamsMapView;
