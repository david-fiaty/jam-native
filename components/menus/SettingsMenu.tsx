import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import MenuIcon from '../icons/MenuIcon';

const SettingsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>        
      <Pressable onPress={() => setModalVisible(true)}>
        <MenuIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default SettingsMenu;