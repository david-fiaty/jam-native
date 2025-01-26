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
    <ScreenView style={styles.container}>  
      <TouchableOpacity
        onPress={() => toggleModal(!isVisible)}
        style={[styles.triggerButton, triggerStyle]}
      >
        {trigger}
      </TouchableOpacity>
    
      <Modal
        //animationType={animationType}
        //transparent={true}
        isVisible={isVisible}
      
        //hardwareAccelerated={true} // Todo - Evaluate impact of enabling this
      >
        <BoxView 
          direction="column" 
          align="flex-start" 
          justify="flex-start" 
          style={styles.modalContainer}
        >
          {backTitle && 
            <BackButton
              title={backTitle}
              onPress={() => toggleModal(false)}
              containerStyle={styles.backButton}
            />
          }
          
          <BoxView direction="column" style={styles.modalContent}>
            {content}
          </BoxView>
        </BoxView>
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  modalContainer: {
    width: '100%',
    //height: modalSize.height,
    //marginTop: modalPosition.y,
    //backgroundColor: Colors.white,
    backgroundColor: 'red',
    paddingTop: Layout.space.base*2,
    flex: 1,
  },
  modalContent: {
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