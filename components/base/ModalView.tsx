import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Modal, View, TouchableWithoutFeedback, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import BackButton from '@/components/navigation/BackButton';
import DeviceManager from '@/classes/DeviceManager';

type Props = {
  label: JSX.Element, 
  title: string,
  content: JSX.Element,
  animation?: string,
  showBorder?: boolean,
};

const { height } = Dimensions.get('window'); 

const ModalView = ({label, title, content, animation, showBorder}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationType = animation ? animation : 'slide';
  const borderStyle = showBorder === true ? borderVisible : borderHidden;

  const slideAnim = useRef(new Animated.Value(height)).current;
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  };



  return (
    <>
      <Animated.View
        style={[
          styles.animatedView,
          { transform: [{ translateY: slideAnim }] }, 
        ]}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.view}>
                <BackButton title={title} onPress={() => setModalVisible(!modalVisible)} />
                <View style={borderStyle}>
                  {content}
                </View>
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View style={modalVisible ? styles.active : {}}>
          {label}
        </View>
      </TouchableOpacity>
    </>
  );
};

const borderHidden = {
  width: '100%',
  gap: GlobalStyles.space.base,
};

const borderVisible = {
  width: '100%',
  gap: GlobalStyles.space.base,
  padding: GlobalStyles.space.base,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: GlobalStyles.space.base,
};

const styles = StyleSheet.create({
  container: {
    height: DeviceManager.modal.height - GlobalStyles.space.container*2,
    marginTop: 'auto',
    marginBottom: GlobalStyles.footer.height,
  },
  view: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: GlobalStyles.space.base,
    paddingBottom: GlobalStyles.footer.height,
    paddingHorizontal: GlobalStyles.space.container,
    backgroundColor: '#FFFFFF',
  },
  active: {
    opacity: 0.5,
  },
});

export default ModalView;