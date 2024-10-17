import { useState } from 'react';
import { StyleSheet, Modal, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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
    backgroundColor: Colors.background,
  },
  view: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: GlobalStyles.space.base,
    paddingBottom: GlobalStyles.footer.height,
    paddingHorizontal: GlobalStyles.space.container,
  },
  active: {
    //backgroundColor: 'orange',
  },
});

export default ModalView;