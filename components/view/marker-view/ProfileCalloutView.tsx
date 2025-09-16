import React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import DataManager from "@/manager/DataManager";
import SectionManager from "@/manager/SectionManager";
import ModalManager from "@/manager/ModalManager";

type Props = {
  item: any;
};

const ProfileCalloutView = ({ item }: Props) => {
  const router = useRouter();

  const onShowMorePress = (row: any) => {
    ModalManager.toggleModal('PublicProfileSection', {
      profileId: row?.id,
      itemData: JSON.stringify(row),
    });
  };

  return (
    <View style={styles.container}>
      <TextView style={styles.fieldTitle}>{i18n.t('Jammer name')}</TextView>
      <TextView style={styles.fieldValue}>{UserManager.getProfileDisplayName(item)}</TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('User name')}</TextView>
      <TextView style={styles.fieldValue}>{item?.profile_name}</TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('Type')}</TextView>
      <TextView style={styles.fieldValue}>{UserManager.getProfileTypeLabel(item?.profile_type)}</TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('Description')}</TextView>
      <TextView style={styles.fieldValue}>
        {item?.profile_description ? DataManager.truncateText(item?.profile_description, 50): i18n.t('Unavailable')}
      </TextView>

      <TouchableOpacity 
        onPress={() => onShowMorePress(item)}
        style={styles.showMoreButton}
      >
        {i18n.t('Show more')}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  fieldTitle: {
    color: Layout.colors.gray,
    fontSize: 11,
  },
  fieldValue: {
    fontSize: 12,
    marginBottom: Layout.space.base/2,
  },
  showMoreButton: {
    fontSize: 12,
    color: Layout.colors.black,
    backgroundColor: Layout.colors.tertiary,
    borderRadius: Layout.radius.round,
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base/2,
    marginTop: Layout.space.base/2,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});

export default ProfileCalloutView;
