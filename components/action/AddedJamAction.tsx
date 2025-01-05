import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';

const AddedJamAction = () => {
  const [entity, setEntity] = useState<any>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  useEffect(() => {
    (async () => {
      if (!entity) setEntity(await EntityManager.getJams({items_ids: [entityId]}));
      if (!isSaved) setIsSaved(await EntityManager.saveJam(entityId));
    })();
  });

  if (!entity) return <SpinnerView />;

  const title = (entity && isSaved) 
    ? i18n.t('Jam is now added') 
    : i18n.t('Adding Jam failed, please try again'); 

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={title}
        onPress={() => ScreenManager.toggleModal('AddedJamAction')}
      />
      
      <View style={styles.listContainer}>
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

        {/* View user Jams */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => ScreenManager.toggleModal('AddedJamAction', { entityId: entityId })} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="share" theme="tertiary" />
            <TextView>{i18n.t('View my Jams')}</TextView>
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

export default AddedJamAction;
