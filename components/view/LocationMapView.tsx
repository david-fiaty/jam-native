import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const LocationMapView = ({ resource, latitude, longitude }: Props) => {

  console.log('resource ->>', resource);
  console.log('latitude ->>', latitude);
  console.log('longitude ->>', longitude);

  return <></>;
};

const styles = StyleSheet.create({
  screenContent: {
    padding: 0,
    paddingTop: Layout.space.base*1.5,
  },
  container: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationMapView;
