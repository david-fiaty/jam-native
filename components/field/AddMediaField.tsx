import { StyleSheet } from 'react-native';
import MediaPickerBase from '../base/MediaPickerBase';
import BoxView from '../view/BoxView';

type ImagePreviewProps = {
  selectedImage?: string;
};

const AddMediaField = () => {  
  return (
      <MediaPickerBase />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: '100%',
  },
});

export default AddMediaField;