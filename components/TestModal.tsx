import { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function TestModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Main Content</Text>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />

      {isModalVisible && (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text>This is a custom modal!</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
