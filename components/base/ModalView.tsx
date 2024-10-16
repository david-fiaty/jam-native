import { useState } from 'react';
import { StyleSheet, Modal, View, TouchableWithoutFeedback, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
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

const ModalView = ({label, title, content, animation, showBorder}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationType = animation ? animation : 'slide';
  const borderStyle = showBorder === true ? borderVisible : borderHidden;

  return (
    <>
      <Modal
        animationType={animationType}
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {label}
      </TouchableOpacity>
    </>
  );
};

const borderHidden = {
  width: '100%',
  gap: GlobalStyles.space,
};

const borderVisible = {
  width: '100%',
  gap: GlobalStyles.space,
  padding: GlobalStyles.space,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: GlobalStyles.space,
};

const styles = StyleSheet.create({
  container: {
    height: DeviceManager.modal.height - GlobalStyles.space,
    marginTop: 'auto',
    marginBottom: GlobalStyles.tabsbar.height,
    backgroundColor: 'black',
    borderWidth: 1,
  },
  view: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    padding: GlobalStyles.space,
  },
});

export default ModalView;