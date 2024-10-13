import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, TouchableWithoutFeedback, StatusBar, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import BackButton from '@/components/navigation/BackButton';

type Props = {
  label: JSX.Element, 
  title: string,
  content: JSX.Element,
  animation?: string,
  backButton?: boolean,
  showBorder?: boolean,
};

const ModalView = ({label, title, content, animation, backButton, showBorder}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationType = animation ? animation : 'slide';
  const wrapperStyle = showBorder === true ? wrapperVisible : wrapperHidden;

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
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.view}>
                <Pressable 
                  onPress={() => setModalVisible(!modalVisible)} 
                  style={backButton === false ? { display: 'none'} : {}}
                >
                  <BackButton title={title} />
                </Pressable>
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

const wrapperVisible = {
  gap: GlobalStyles.space,
  padding: GlobalStyles.space,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: GlobalStyles.space,
  width: '100%',
};

const wrapperHidden = {
  gap: GlobalStyles.space,
  padding: GlobalStyles.space,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: GlobalStyles.space,
  width: '100%',
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight + GlobalStyles.toolbar.height,
    backgroundColor: 'black',
    height: '100%',
  },
  view: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    padding: 20,
  },
});

export default ModalView;