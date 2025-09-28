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
      justify="flex-start"
      style={styles.container}
      onPress={() => ModalManager.toggleModal(currentModal?.id)}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />

      <TextView style={styles.title}>
        {i18n.t(currentModal?.title)}
      </TextView>

      {currentModal.toolbarButtons?.length > 0 && (
        <BoxView direction="row" align="center" justify="flex-end" style={styles.toolbar}>
          {currentModal.toolbarButtons.map((o: any, i: number) => {
            return (
              <TouchableOpacity
                key={`button-${i}`}
                onPress={onBackPress}
              >
                <BoxView direction="row" align="center" justify="flex-end">
                  <TextView>{o.label}</TextView>
                  {o?.icon && (
                    <IconView
                      name={o.icon}
                      theme="transparent"
                      padding={0}
                      size={16}
                    />
                  )}
                </BoxView>
              </TouchableOpacity>
            );
          })}
        </BoxView>
      )}
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
