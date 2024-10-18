import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import ClearIcon from '../icons/ClearIcon';
import ProfileImageField from '../fields/ProfileImageField';

const ProfileImage = () => {
  return (
    <View style={styles.container}>
      <ProfileImageField />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space.base*2,
    marginBottom: GlobalStyles.space.base*2,
  },
});

export default ProfileImage;