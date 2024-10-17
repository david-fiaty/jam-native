import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import ClearIcon from '../icons/ClearIcon';

const ProfileImage = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={86} color={GlobalStyles.icon.color} />
      <TextBlock style={styles.text}>Upload a Jam user profile image</TextBlock>
      <ClearIcon name="next" size={28}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space.base*2,
    marginBottom: GlobalStyles.space.base*2,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    gap: GlobalStyles.space.base,
  },
  text: {
    width: '40%',
  },
});

export default ProfileImage;