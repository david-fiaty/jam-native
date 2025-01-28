import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/manager/ScreenManager';
import ModalView from "../view/ModalView";
import JamsMapView from "../view/JamsMapView";
import i18n from "@/translation/i18n";
import JamForm from "../form/JamForm";
import ProfileForm from "../form/ProfileForm";
import SearchView from '../view/SearchView';

const containerStyle = ScreenManager.getFooterSize();
const containerPosition = ScreenManager.getFooterPosition();
const activeModal = ScreenManager.getActiveModal();

const FooterNavigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onTriggerPress = (active: boolean) => {
    console.log('-->', active); // Todo - Hilight items
  };

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="center" 
      style={[styles.container, containerStyle]}
    >
      <ModalView 
        login={false}
        content={<JamsMapView />}
        backTitle={i18n.t('Jam locations')}
        triggerAlignSelf="center"
        onTriggerPress={onTriggerPress}
        trigger={
          <IconView
            name="location"
            radius="round"
            size={16}
            padding={4}
            theme={activeModal?.name == 'JamsMapView' ? 'secondary' : 'clear'}
          />
        }
      />

      <ModalView 
        login={true}
        content={<JamForm />}
        backTitle={i18n.t('Create a Jam')}
        triggerAlignSelf="center"
        onTriggerPress={onTriggerPress}
        trigger={
          <IconView
            name="plus"
            radius="round"
            size={16}
            padding={4}
            theme={activeModal?.name == 'JamForm' ? 'secondary' : 'clear'}
            style={activeModal?.name == 'JamForm' ? styles.active : {}}
          />
        }
      />

      <ModalView 
        login={true}
        content={<SearchView />}
        backTitle={i18n.t('Search')}
        triggerAlignSelf="center"
        onTriggerPress={onTriggerPress}
        trigger={
          <IconView
            name="search"
            radius="round"
            size={16}
            padding={4}
            theme={activeModal?.name == 'SearchView' ? 'secondary' : 'clear'}
            style={activeModal?.name == 'SearchView' ? styles.active : {}}
          />
        }
      />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: Layout.borderWidth.base,
    borderTopColor: Colors.primary,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: containerPosition.y,
  },
  active: {
    backgroundColor: Colors.secondary,
  },
});

export default FooterNavigation;
