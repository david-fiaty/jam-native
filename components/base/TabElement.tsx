import { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';

type Props = {
  label: JSX.Element,
  content: JSX.Element,
}

const TabElement = ({label, content}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
    backgroundColor: 'rgba(0,0,0,0.5)', // This creates the backdrop effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default TabElement;