import { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from '../view/BoxView';
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import ActionListItem from '../list/ListItem/ActionListItem';

const MoreJamActionsView = () => {
  const [entity, setEntity] = useState<any>(null);
  const entityId = ScreenManager.getScreenEntityId();

  const actions: any = [
    {
      label: i18n.t('Save Jam'),
      icon: 'save',
      onPress: () => ScreenManager.toggleScreen('SavedJamAction', { entityId: entityId }),
    },
    {
      label: i18n.t('Like Jam'),
      icon: 'like',
      onPress: () => ScreenManager.toggleScreen('LikedJamAction', { entityId: entityId }),
    },
    {
      label: i18n.t('Share Jam'),
      icon: 'share',
      onPress: () => EntityManager.shareJam(entityId),
    },
    {
      label: i18n.t('Add Jam to project'),
      icon: 'plus',
      onPress: () => console.log('action clicked') , // Todo - Implement logic
    },
    {
      label: i18n.t('Edit Jam'),
      icon: 'edit',
      onPress: () => console.log('action clicked') , // Todo - Implement logic
    },
    {
      label: i18n.t('Report Jam'),
      icon: 'report',
      onPress: () => console.log('action clicked') , // Todo - Implement logic
    },
    {
      label: i18n.t('Delete Jam'),
      icon: 'delete',
      onPress: () => console.log('action clicked') , // Todo - Implement logic
    },
  ];

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
        onPress={() => ScreenManager.toggleScreen('MoreJamActionsView')}
      />
      
      <View style={styles.listContainer}>
        { actions.map((item: any) => {
          return <ActionListItem item={item} />;
        }) }
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

export default MoreJamActionsView;
