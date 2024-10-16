import { useState } from 'react';
import { StyleSheet, Modal, View, TouchableWithoutFeedback, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import BackButton from '@/components/navigation/BackButton';

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
  const wrapperStyle = showBorder === true ? wrapperVisible : wrapperHidden;

  const a = Dimensions.get('window').height;
  const b = StatusBar.currentHeight + GlobalStyles.toolbar.height;

  console.log(a -b);


  return (
    <View style={styles.container}>        
      <Modal
        animationType={animationType}
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modal.container}>
            <TouchableWithoutFeedback>
              <View style={styles.modal.view}>
                <BackButton title={title} onPress={() => setModalVisible(!modalVisible)} />
                <View style={wrapperStyle}>
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
    </View>
  );
};

const wrapperHidden = {
  width: '100%',
  gap: GlobalStyles.space,
};

const wrapperVisible = {
  width: '100%',
  gap: GlobalStyles.space,
  padding: GlobalStyles.space,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: GlobalStyles.space,
};

const styles = StyleSheet.create({
  container: {
  },
  modal: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: StatusBar.currentHeight + GlobalStyles.toolbar.height,
      backgroundColor: 'black',
    },
    view: {
      backgroundColor: 'white',
      width: '100%',
      height: 612,
      //height: Dimensions.get('screen').height - GlobalStyles.tabsbar.height,
      alignItems: 'flex-start',
      padding: GlobalStyles.space*2,
    },
  },
});

export default ModalView;