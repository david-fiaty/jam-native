import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import DeviceManager from '@/classes/DeviceManager';
import TextBlock from './TextBlock';

type Props = {
  label: JSX.Element,
  content: JSX.Element,
}

const TabElement = ({label, content}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.label}>
          {label}
        </View>
      </TouchableOpacity>
  
      {isModalVisible && (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <TextBlock>hhh</TextBlock>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: GlobalStyles.space.container*2,
    //top: 0,
    //left: 0,
  }, 
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GlobalStyles.footer.height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    width: '100%',
    height: DeviceManager.modal.height - GlobalStyles.header.height + GlobalStyles.space.base,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default TabElement;