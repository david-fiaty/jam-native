import { View } from 'react-native';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ScrollContainer from '../base/ScrollContainer';
import { GlobalStyles } from '@/constants/GlobalStyles';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollContainer>
        <ProfileImage />
        <ProfileForm />
        <ProfileProjects />
        <ProfileJams />
      </ScrollContainer>   
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: GlobalStyles.space.container,
  },
};

export default ProfileScreen;