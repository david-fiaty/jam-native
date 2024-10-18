import { View } from 'react-native';
import JamForm from '../forms/JamForm';
import BackButton from '../navigation/BackButton';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>
      <BackButton title="Add new Jam" />
      <JamForm />
    </View>
  );
};

const styles = {
  container: {
  },
};


export default AddJamScreen;