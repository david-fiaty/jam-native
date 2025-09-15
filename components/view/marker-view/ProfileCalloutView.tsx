import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import DataManager from "@/manager/DataManager";

type Props = {
  item: any;
};

const ProfileCalloutView = ({ item }: Props) => {

  return (
    <View>
      <div>{UserManager.getProfileDisplayName(item)}</div>
      <div>{item?.profile_name}</div>
      <div>{UserManager.getProfileTypeLabel(item?.profile_type)}</div>
      <div>{DataManager.truncateText(item?.profile_description, 50)}</div>
      <button>
        {i18n.t('Show more')}
      </button>
    </View>
  );
};

const styles = StyleSheet.create({

  
});

export default ProfileCalloutView;
