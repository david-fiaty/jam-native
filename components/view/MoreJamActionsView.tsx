import { useState, useEffect } from 'react';
import { View, Alert } from "react-native";
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from '../view/BoxView';
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import ActionListItem from '../list/ListItem/ActionListItem';
import DataManager from '@/manager/DataManager';
import UserManager from '@/manager/UserManager';

const MoreJamActionsView = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEntityOwner, setIsEntityOwner] = useState<boolean>(false);
  const entityId: number = ScreenManager.getScreenEntityId();
  
  const actions: any = [
    {
      label: i18n.t('Save Jam'),
      icon: 'save',
      canDisplay: () => true,
      onPress: () => ScreenManager.toggleScreen('SavedJamAction', { entityId: entityId }),
    },
    {
      label: i18n.t('Like Jam'),
      icon: 'like',
      canDisplay: () => true,
      onPress: () => ScreenManager.toggleScreen('LikedJamAction', { entityId: entityId }),
    },
    {
      label: i18n.t('Share Jam'),
      icon: 'share',
      canDisplay: () => true,
      onPress: () => EntityManager.shareJam(entityId),
    },
    {
      label: i18n.t('Add Jam to project'),
      icon: 'plus',
      canDisplay: () => true,
      //canDisplay: () => isEntityOwner, // Todo - Enable this
      onPress: () => ScreenManager.toggleScreen('AddJamToProjectForm', { entityId: entityId }),
    },
    {
      label: i18n.t('Edit Jam'),
      icon: 'edit',
      canDisplay: () => true,
      //canDisplay: () => isEntityOwner, // Todo - Enable this
      onPress: () => ScreenManager.toggleScreen('JamForm', { entityId: entityId }),
    },
    {
      label: i18n.t('Report Jam'),
      icon: 'report',
      canDisplay: () => !isEntityOwner,
      onPress: () => {
        Alert.alert(
          i18n.t('Report'), 
          i18n.t('This item will be reported. Would you like to proceed?'), 
          [
            {
              text: i18n.t('No'),
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: i18n.t('Yes'),
              onPress: async () => { 
                let result: any = await EntityManager.reportItem('jam', entityId);
                if (result?.error) {
                  ScreenManager.showMessage({
                    title: i18n.t('Report'),
                    content: i18n.t('Report action failed, please try again.'),
                  });
                }
              },
            },
          ]
        );
      }, 
    },
    {
      label: i18n.t('Delete Jam'),
      icon: 'delete',
      canDisplay: () => isEntityOwner,
      onPress: () => {
        Alert.alert(
          i18n.t('Report'), 
          i18n.t('This item will be deleted. Would you like to proceed?'), 
          [
            {
              text: i18n.t('No'),
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: i18n.t('Yes'),
              onPress: () => { 
                let result: any = EntityManager.deleteJam(entityId); 
                if (result?.error) {
                  ScreenManager.showMessage({
                    title: i18n.t('Delete'),
                    content: i18n.t('Delete action failed, please try again.'),
                  });
                }
              },
            },
          ]
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsEntityOwner(await UserManager.isJamOwner(entityId));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;
  
  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('More actions')}
        onPress={() => ScreenManager.toggleScreen('MoreJamActionsView')}
      />
      
      <View style={Layout.borderedListContainer}>
        { actions.map((item: any) => {
          if (item.canDisplay() === true) {
            return <ActionListItem key={DataManager.createUuid()} item={item} />
          }
        })}
      </View>
    </BoxView>
  );
};

export default MoreJamActionsView;
