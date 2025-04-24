import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";
import CollapsibleView from "../view/CollapsibleView";

type Props = {
  resource: string;
};

const SectorsList = ({ resource }: Props) => {

  console.log('--->', resource);

  return (
    <></>
  );
  
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listItemCollapsible: {
    paddingHorizontal: Layout.space.base/2,
    paddingVertical: Layout.space.base/1.2,
  },
  listItemDetails: {
    gap: Layout.space.base,
  },
  listSubItem: {
    marginLeft: 0,
    paddingVertical: Layout.space.base/2.2,
  },
  itemHeader: {
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
  itemHeaderOpened: {
    backgroundColor: Colors.secondary,
  },
});

export default SectorsList;
