import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { Layout } from '@/constants/Layout';
import UserManager from '@/manager/UserManager';
import BackButton from '../button/BackButton';
import ScreenView from './ScreenView';
import BoxView from './BoxView';
import ScreenManager from '@/manager/ScreenManager';
import { Colors } from '@/constants/Colors';

type Props = {
  visible?: boolean;
  login?: boolean;
  animation?: string;
  trigger?: any;
  triggerAlignSelf?: string;
  content?: any;
  backTitle?: any;
  onTriggerPress?: (active: boolean) => void;
};

const modalPosition: any = ScreenManager.getModalPosition();
const modalSize: any = ScreenManager.getModalSize();

const ModalView = ({ visible, login, animation, trigger, triggerAlignSelf, content, backTitle, onTriggerPress }: Props) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(visible || false);
  const animationType: any = animation || 'slide';
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const triggerStyle: any = {
    alignSelf: triggerAlignSelf || 'flex-start',
  }

  const toggleModal = (isActive: boolean) => {
    if (login && !isLoggedIn) {
      router.push("/login");
    }
    else {
      setIsVisible(isActive);
      if (onTriggerPress) onTriggerPress(isActive);
    }
  };
  
  return (
    <ScreenView>  
      <TouchableOpacity
        onPress={() => toggleModal(!isVisible)}
        style={[styles.triggerButton, triggerStyle]}
      >
        {trigger}
      </TouchableOpacity>
    
      <Modal
        isVisible={isVisible}
        backdropColor={styles.backdrop.color}
        backdropOpacity={styles.backdrop.opacity}
        style={styles.container}
      >
        <BoxView 
          direction="column" 
          align="flex-start" 
          justify="flex-start" 
          style={styles.wrapper}
        >
          {backTitle && 
            <BackButton
              title={backTitle}
              onPress={() => toggleModal(false)}
              containerStyle={styles.backButton}
            />
          }
          
          <BoxView direction="column" style={styles.content}>
            {content}
          </BoxView>
        </BoxView>
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    color: Colors.white,
    opacity: 0.5,
    marginTop: 50,
  },
  container: {
    marginTop: modalPosition.y, 
    marginHorizontal: 0,
  },
  wrapper: {
    width: '100%',
    marginTop: 0,
    backgroundColor: Colors.white,
    paddingTop: Layout.space.base*2,
    height: modalSize.height,
  },
  content: {
    width: '100%',
    flex: 1,
  },
  backButton: {
    marginLeft: Layout.space.base*1.5,
  },
  triggerButton: {
    alignSelf: 'flex-start',
  }
});

export default ModalView;