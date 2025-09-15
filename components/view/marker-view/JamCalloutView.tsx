import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";
import SectionManager from "@/manager/SectionManager";
import UserManager from "@/manager/UserManager";
import DataManager from "@/manager/DataManager";
import EntityManager from "@/manager/EntityManager";

type Props = {
  item: any;
};

const JamCalloutView = ({ item }: Props) => {
  const router = useRouter();

  const onShowMorePress = (row: any) => {
    let path: string = 'public-jam';
    let params: any = {
      jamId: row?.id,
      title: i18n.t('Jam'),
      itemData: JSON.stringify(row),
      disableInfiniteScroll: true,
    };

    SectionManager.push(router, path, params);
  };

  return (
    <View style={styles.container}>
      <TextView style={styles.fieldTitle}>{i18n.t('@host')}</TextView>
      <TextView style={styles.fieldValue}>{EntityManager.getJamOwnerName(item)}</TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('Type')}</TextView>
      <TextView style={styles.fieldValue}>{EntityManager.getJamTypeLabel(item?.type)}</TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('Name')}</TextView>
      <TextView style={styles.fieldValue}>
        {item?.title ? DataManager.truncateText(item?.title, 50) : i18n.t('Unavailable')}
      </TextView>

      <TextView style={styles.fieldTitle}>{i18n.t('Description')}</TextView>
      <TextView style={styles.fieldValue}>
        {item?.caption ? DataManager.truncateText(item?.caption, 50) : i18n.t('Unavailable')}
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
    marginBottom: Layout.space.base / 2,
  },
  showMoreButton: {
    fontSize: 12,
    color: Layout.colors.black,
    backgroundColor: Layout.colors.tertiary,
    borderRadius: Layout.radius.round,
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base / 2,
    marginTop: Layout.space.base/2,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});

export default JamCalloutView;
