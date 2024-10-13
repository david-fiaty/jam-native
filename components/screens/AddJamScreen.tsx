import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import ClearIcon from '../icons/ClearIcon';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>     
      <ModalView 
        title="Add a new Jam" 
        animation="slide"
        label={<ClearIcon name="plus" />}
        content={<JamForm />}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddJamScreen;