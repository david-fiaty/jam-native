import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '../base/StaticImage';

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    console.log(result);
  } else {
    alert('No image was selected.');
  }
};

const MediaPickerField = () => {  
  return (
    <TouchableOpacity onPress={pickImageAsync}>
      <View style={styles.container}>
        <Ionicons name="add" size={GlobalStyles.icon.size} style={styles.icon} />   
        <TextBlock>Add media</TextBlock>
      </View>
      <View style={styles.preview}>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: GlobalStyles.space,
    marginBottom: GlobalStyles.space,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.tertiary,
      borderColor: Colors.tertiary,
      borderWidth: 1,
      borderRadius: 4,
    },
  },
  preview: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.tertiary,
  },
});

export default MediaPickerField;