import { StyleSheet } from 'react-native';
import MediaPicker from '../base/MediaPicker';

type ImagePreviewProps = {
  selectedImage?: string;
};

const AddMediaField = () => {  
  return (
    <MediaPicker />
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AddMediaField;