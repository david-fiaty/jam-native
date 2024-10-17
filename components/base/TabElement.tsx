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
      <View style={styles.label}>
        <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
          {label}
        </TouchableOpacity>
      </View>

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modal: {
    position: 'absolute',
    bottom: GlobalStyles.footer.height,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // This creates the backdrop effect
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    //height: DeviceManager.modal.height - GlobalStyles.space.container*2,
    //marginTop: 'auto',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default TabElement;