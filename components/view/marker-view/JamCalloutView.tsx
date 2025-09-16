import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";
import DataManager from "@/manager/DataManager";
import EntityManager from "@/manager/EntityManager";
import ModalManager from "@/manager/ModalManager";

type Props = {
  item: any;
};

const JamCalloutView = ({ item }: Props) => {
  const onShowMorePress = (row: any) => {
    ModalManager.toggleModal('PublicJamSection', {
      jamId: row?.id,
      itemData: JSON.stringify(row),
    });
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
        <Text>{i18n.t('Show more')}</Text>
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
    marginTop: Layout.space.base / 2,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});

export default JamCalloutView;
