import { StyleSheet, Text, View } from 'react-native';
import ModalView from '../ModalView';
import JamForm from '../forms/JamForm';
import PlusIcon from '../icons/PlusIcon';

const AddJam = () => {
  return (
    <View style={styles.container}>     
      <ModalView 
        title="Add a new Jam" 
        label={<PlusIcon size={26} />}
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

export default AddJam;