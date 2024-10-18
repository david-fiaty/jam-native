import { useRouter } from 'expo-router';
import { View } from 'react-native';
import JamForm from '../forms/JamForm';
import BackButton from '../navigation/BackButton';
import ScrollContainer from '../base/ScrollContainer';

const AddJamScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <BackButton title="Add new Jam" onPress={() => router.replace('/main') } />
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