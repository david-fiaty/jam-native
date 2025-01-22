import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Marker } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import RNMapView from "react-native-maps";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";

const JamsMapView = ({ style, children }: BaseProps) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [jamsData, setJamsData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const markerImage = require('@/assets/images/logo-55.png');

  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": Colors.white,
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": Colors.secondary,
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": Colors.gray,
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": Colors.gray,
        }
      ]
    }
  ];
  
  const getInitialRegion = () => {
    let latitude = currentLocation?.coords?.latitude || Config.defaultLocation.latitude;
    let longitude = currentLocation?.coords?.longitude || Config.defaultLocation.longitude;

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 5,
      longitudeDelta: 5,
    };
  };

  const getMarkerTitle = (item: any) => {
    if (!item?.title?.length) {
      return item?.caption?.substring(0, 45) + "...";
    }

    return item.title;
  };

  const getMarkerCoordinate = (item: any) => {
    return {
      latitude: parseFloat(item?.geolocation_latitude),
      longitude: parseFloat(item?.geolocation_longitude),
    };
  };

  const renderMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker
          key={item.id}
          title={getMarkerTitle(item)}
          description={item?.caption}
          coordinate={getMarkerCoordinate(item)}
          icon={markerImage} 
        />
      );
    }

    return null;
  };

  DeviceManager.getLocation().then((data: any) => {
    setCurrentLocation(data);
  });

  useEffect(() => {
    (async () => {
      if (!jamsData?.length) setJamsData(await EntityManager.listJams());
      setCurrentLocation(await DeviceManager.getLocation());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <TouchableWithoutFeedback>
      <View style={[Layout.screenContent, styles.container]}>
        <RNMapView
          style={styles.map}
          provider="google"
          initialRegion={getInitialRegion()}
          customMapStyle={mapStyle}
        >
          {currentLocation && (
            <Marker
              pinColor={Colors.secondary}
              title={i18n.t("Your Location")}
              description={i18n.t("This is where you are currently")}
              coordinate={{
                latitude: parseFloat(currentLocation?.coords?.latitude),
                longitude: parseFloat(currentLocation?.coords?.longitude),
              }}
            />
          )}

          {jamsData?.map((item: any) => renderMarker(item))}
        </RNMapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base * 2,
  },
  map: {
    flex: 1,
  },
});

export default JamsMapView;
