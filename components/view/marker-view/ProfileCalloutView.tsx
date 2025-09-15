import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import DataManager from "@/manager/DataManager";
import SectionManager from "@/manager/SectionManager";

type Props = {
  item: any;
};

const ProfileCalloutView = ({ item }: Props) => {
  const router = useRouter();

  const onShowMorePress = (row: any) => {
    let path: string = 'public-jam';
    let params: any = {
      jamId: item?.id,
      title: i18n.t('Jam'),
      itemData: JSON.stringify(item),
      disableInfiniteScroll: true,
    };

    SectionManager.push(router, path, params);
  };

  return (
    <View>
      <TextView>{UserManager.getProfileDisplayName(item)}</TextView>
      <TextView>{item?.profile_name}</TextView>
      <TextView>{UserManager.getProfileTypeLabel(item?.profile_type)}</TextView>
      <TextView>{DataManager.truncateText(item?.profile_description, 50)}</TextView>
      <TouchableOpacity onPress={() => onShowMorePress(item)}>
        {i18n.t('Show more')}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  
});

export default ProfileCalloutView;
