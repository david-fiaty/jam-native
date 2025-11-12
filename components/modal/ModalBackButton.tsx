import React, { useEffect } from "react";
import { BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import ModalManager from '@/manager/ModalManager';
import i18n from '@/translation/i18n';

type Props = {
  currentModal: any;
  visible?: boolean;
};

const ModalBackButton = ({ currentModal, visible }: Props) => {
  const onBackPress = () => {
    ModalManager.toggleModal(currentModal?.id);
    return true;
  };

  const renderEditButton = () => {
    return (
      <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => ModalManager.toggleModal(currentModal?.editButton?.component, {
            [currentModal?.editButton?.idField]: currentModal?.params?.[currentModal?.editButton?.idField],
          })}
        >
          <BoxView direction="row" align="center" justify="flex-end">
            <TextView>{currentModal?.editButton?.label}</TextView>

            {currentModal?.editButton?.icon && (
              <IconView
                name={currentModal?.editButton?.icon}
                theme="transparent"
                padding={0}
                size={14}
              />
            )}
          </BoxView>
        </TouchableOpacity>
      </BoxView>
    );
  };

  const renderToolbarButton = () => {
    return (
      <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => ModalManager.toggleModal(currentModal?.toolbarButton?.component)}
        >
          <BoxView direction="row" align="center" justify="flex-end">
            <TextView>{currentModal?.toolbarButton?.label}</TextView>
            
            {currentModal?.toolbarButton?.icon && (
              <IconView
                name={currentModal?.toolbarButton?.icon}
                theme="transparent"
                padding={0}
                size={14}
              />
            )}
          </BoxView>
        </TouchableOpacity>
      </BoxView>
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  if (!visible === true) {
    return <></>;
  }

  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={styles.container}
    >
      <BoxView
        direction="row"
        align="center"
        onPress={onBackPress}
      >
        <IconView
          name="previous"
          theme="clear"
          padding={0}
        />

        <TextView style={styles.title}>
          {i18n.t(currentModal?.title)}
        </TextView>
      </BoxView>

      {Object.keys(currentModal?.toolbarButton || {})?.length > 0 && renderToolbarButton()}

      {Object.keys(currentModal?.editButton || {})?.length > 0 && !currentModal?.params?.idArray?.length && renderEditButton()}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.white,
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  toolbar: {
    flex: 1,
  },
});

export default ModalBackButton;
