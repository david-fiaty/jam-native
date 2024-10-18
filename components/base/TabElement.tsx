import { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import DeviceManager from '@/classes/DeviceManager';

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
              {content}
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
});

export default TabElement;