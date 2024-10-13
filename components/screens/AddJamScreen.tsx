import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import StaticIcon from '../base/StaticIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>     
      <ModalView 
        title="Add a new Jam" 
        animation="slide"
        label={
          <ClearIcon name="plus" />
        }
        content={<JamForm />}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
});

export default AddJamScreen;