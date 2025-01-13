import { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import ActionListItem from '../list/ListItem/ActionListItem';
import DataManager from '@/manager/DataManager';

const SavedJamAction = () => {
  const [entity, setEntity] = useState<any>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const entityId = ScreenManager.getScreenEntityId();

  const actions: any = [
    {
      label: i18n.t('Share Jam'),
      icon: 'share',
      onPress: () => EntityManager.shareJam(entityId),
    },
    {
      label: i18n.t('View my Jams'),
      icon: 'plus',
      onPress: () => console.log('action clicked') , // Todo - Implement logic
    },
  ];

  const getTitle = () => { 
    return (entity && isSaved) 
      ? i18n.t('Jam is now saved to your jams') 
      : i18n.t('Saving Jam failed, please try again'); 
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setEntity(await EntityManager.getJams({items_ids: [entityId]}));
        setIsSaved(await EntityManager.saveJam(entityId));
      }

      setIsLoaded(true);
    })();
  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={getTitle()}
        onPress={() => ScreenManager.toggleScreen('SavedJamAction')}
      />
      
      <View style={styles.listContainer}>
        { actions.map((item: any) => {
          return <ActionListItem key={DataManager.createUuid()} item={item} />;
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

export default SavedJamAction;
