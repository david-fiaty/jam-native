import { StyleSheet, View } from 'react-native';
import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import StaticIcon from '../base/StaticIcon';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>     
      <ModalView 
        title="Add a new Jam" 
        label={<StaticIcon name="plus" size={26} />}
        content={<JamForm />}
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AddJamScreen;