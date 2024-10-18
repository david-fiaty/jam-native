import { View } from 'react-native';
import JamForm from '../forms/JamForm';
import BackButton from '../navigation/BackButton';
import ScrollContainer from '../base/ScrollContainer';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>
      <BackButton title="Add new Jam" />
      <ScrollContainer>
      <JamForm />
      </ScrollContainer>
    </View>
  );
};

const styles = {
  container: {
  },
};


export default AddJamScreen;