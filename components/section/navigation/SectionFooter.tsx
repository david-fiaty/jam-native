import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setFooterLayout } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import { StyleSheet, View } from 'react-native';
import IconView from '@/components/view/IconView';
import BoxView from '@/components/view/BoxView';
import ModalManager from '@/manager/ModalManager';
import UserManager from "@/manager/UserManager";
import SectionManager from "@/manager/SectionManager";

type Props = {
  style?: any;
};

const SectionFooter = ({ style }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const modalState: any = useSelector((state: any) => state.modal, shallowEqual);

  const getIconTheme = (modalId: string) => {
    if (modalState.active.length > 0 && modalState.active[modalState.active.length - 1].id == modalId) {
      return 'primary';
    }

    return 'clear';
  };

  useEffect(() => {
    setIsLoggedIn(UserManager.isLoggedIn());
  }, []);

  return (
    <View onLayout={(e: any) => dispatch(setFooterLayout(e.nativeEvent.layout))}>
      <BoxView
        direction="row"
        align="center"
        justify="space-around"
        style={[styles.container, style]}
      >
        <IconView
          name="location"
          radius="round"
          size={16}
          padding={4}
          theme={getIconTheme('JamsMapView')}
          onPress={() => isLoggedIn ? ModalManager.toggleModal('JamsMapView') : SectionManager.push(router, 'login')}
        />

        <IconView
          name="plus"
          radius="round"
          size={16}
          padding={4}
          theme={getIconTheme('JamForm')}
          onPress={() => isLoggedIn ? ModalManager.toggleModal('JamForm', { resource: 'jam' }) : SectionManager.push(router, 'login')}
        />

        <IconView
          name="user"
          radius="round"
          size={16}
          padding={4}
          theme={getIconTheme('PrivateProfileSection')}
          onPress={() => isLoggedIn ? ModalManager.toggleModal('PrivateProfileSection') : SectionManager.push(router, 'login')}
        />
      </BoxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.white,
    borderTopWidth: Layout.borderWidth.base,
    borderTopColor: Layout.colors.primary,
    padding: Layout.space.base,
  },
});

export default SectionFooter;
