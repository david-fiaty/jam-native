import { View } from 'react-native';
import JamForm from '../forms/JamForm';
import ScrollContainer from '../base/ScrollContainer';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollContainer>
        <JamForm />
      </ScrollContainer>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: GlobalStyles.space.container,
  },
};


export default AddJamScreen;