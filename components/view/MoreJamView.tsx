import { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';

const MoreJamView = () => {
  const [entity, setEntity] = useState<any>(null);
  const entityId = ScreenManagergetScreenEntityId();

  useEffect(() => {
    (async () => {
      if (!entity) setEntity(await EntityManager.getJams({items_ids: [entityId]}));
    })();
  });

  if (!entity) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('More actions')}
        onPress={() => ScreenManager.toggleModal('MoreJamView')}
      />
      
      <View style={styles.listContainer}>
        {/* Save jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('SavedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="save" theme="tertiary" />
            <TextView>{i18n.t('Save Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Like jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('LikedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="share" theme="tertiary" />
            <TextView>{i18n.t('Like Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Share jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => EntityManager.shareJam(entityId)} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="share" theme="tertiary" />
            <TextView>{i18n.t('Share Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Add jam to project */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('SavedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="plus" theme="tertiary" />
            <TextView>{i18n.t('Add Jam to project')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Edit jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('SavedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="edit" theme="tertiary" />
            <TextView>{i18n.t('Edit Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Report jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('SavedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="report" theme="tertiary" />
            <TextView>{i18n.t('Report Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Delete jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('SavedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="delete" theme="tertiary" />
            <TextView>{i18n.t('Delete Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listContainer: Layout.borderedListContainer,
  listItem: {
    marginBottom: Layout.space.base,
  }, 
});

export default MoreJamView;
