import { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import BoxView from '../view/BoxView';
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import DataManager from '@/manager/DataManager';
import UserManager from '@/manager/UserManager';
import IconView from './IconView';
import TextView from './TextView';
import ModalManager from '@/manager/ModalManager';

type Props = {
  jamId?: any;
};

const MoreJamActionsView = ({ jamId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEntityOwner, setIsEntityOwner] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<any>(null);

  const saveJam = async () => {
    setIsProcessing('save_jam');

    let result: any = await UserManager.saveJam(jamId);

    let message: any = {
      title: i18n.t('Save Jam'),
      content: i18n.t('Jam successfully saved.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    ScreenManager.showMessage(message);

    setIsProcessing(null);
  };

  const likeJam = async () => {
    setIsProcessing('like_jam');
    let result: any = await UserManager.likeJam(jamId);

    let message: any = {
      title: i18n.t('Like Jam'),
      content: i18n.t('Jam successfully liked.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    ScreenManager.showMessage(message);

    setIsProcessing(null);
  };

  const actions: any = [
    {
      label: i18n.t('Save JAM!'),
      icon: 'save',
      showSpinner: 'save_jam',
      canDisplay: () => true,
      onPress: () => saveJam(),
    },
    {
      label: i18n.t('Like JAM!'),
      icon: 'like',
      showSpinner: 'like_jam',
      canDisplay: () => true,
      onPress: () => likeJam(),
    },
    {
      label: i18n.t('Share JAM!'),
      icon: 'share',
      canDisplay: () => true,
      onPress: () => EntityManager.shareJam(jamId),
    },
    {
      label: i18n.t('Add JAM! to project'),
      icon: 'plus',
      canDisplay: () => isEntityOwner,
      onPress: () => ModalManager.toggleModal('AddJamToProjectForm', { jamId: jamId }),
    },
    {
      label: i18n.t('Edit JAM!'),
      icon: 'edit',
      canDisplay: () => isEntityOwner,
      onPress: () => ModalManager.toggleModal('JamForm', { jamId: jamId }),
    },
    {
      label: i18n.t('Report JAM!'),
      icon: 'report',
      canDisplay: () => !isEntityOwner,
      onPress: () => {
        Alert.alert(
          i18n.t('Report'),
          i18n.t('This item will be reported. Would you like to proceed?'),
          [
            {
              text: i18n.t('No'),
              onPress: () => { },
              style: 'cancel',
            },
            {
              text: i18n.t('Yes'),
              onPress: async () => {
                let result: any = await EntityManager.reportItem('jam', jamId);
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
      label: i18n.t('Delete JAM!'),
      icon: 'delete',
      canDisplay: () => isEntityOwner,
      onPress: () => {
        Alert.alert(
          i18n.t('Delete JAM!'),
          i18n.t('This item will be deleted. Would you like to proceed?'),
          [
            {
              text: i18n.t('No'),
              onPress: () => { },
              style: 'cancel',
            },
            {
              text: i18n.t('Yes'),
              onPress: async () => {
                let result: any = await UserManager.deleteJam(jamId);
                ScreenManager.showMessage(result.message);
              },
            },
          ]
        );
      },
    },
  ];

  const renderItem = (item: any) => {
    const onItemPress = () => {
      if (item?.onPress) item.onPress();
    };

    return (
      <TouchableOpacity onPress={onItemPress}>
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.listItem}
        >
          {isProcessing === item?.showSpinner && (
            <View style={styles.spinnerContainer}>
              <SpinnerView size="small" />
            </View>
          )}

          {isProcessing !== item?.showSpinner && (
            <IconView
              name={item?.icon}
              theme="tertiary"
              size={12}
              padding={6.5}
            />
          )}

          <TextView>{item?.label}</TextView>
        </BoxView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsEntityOwner(await UserManager.isJamOwner(jamId));
      }
    })();

    setIsLoaded(true);
  }, [isLoaded, jamId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {actions.map((item: any) => {
          if (item.canDisplay() === true) {
            return (
              <View key={DataManager.createUuid()}>
                {renderItem(item)}
              </View>
            );
          }
        })}
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    ...Layout.listItem,
    ...{
      padding: Layout.space.base / 1.3,
    },
  },
  spinnerContainer: {
    marginLeft: 5,
  },
});

export default MoreJamActionsView;
