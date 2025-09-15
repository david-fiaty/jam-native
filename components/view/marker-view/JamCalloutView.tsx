import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";

type Props = {
  item: any;
};

const JamCalloutView = ({ item }: Props) => {

  return (
    <TextView>hello</TextView>
  );
};

const styles = StyleSheet.create({
});

export default JamCalloutView;
