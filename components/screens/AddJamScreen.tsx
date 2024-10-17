import { View } from 'react-native';
import JamForm from '../forms/JamForm';
import ScrollContainer from '../base/ScrollContainer';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AddJamScreen = () => {
  return (
    <View style={styles.container}>
      <JamForm />
    </View>
  );
};

const styles = {
  container: {
    width: 200,
    //width: '100%',
    //paddingHorizontal: GlobalStyles.space.container,
  },
};


export default AddJamScreen;