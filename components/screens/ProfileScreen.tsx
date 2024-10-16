import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ClearIcon from '../icons/ClearIcon';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ScrollContainer from '../base/ScrollContainer';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        animation="fade"
        label={<ClearIcon name="user" size={GlobalStyles.tabsbar.icon.size} />}
        content={
          <ScrollContainer>
            <ProfileImage />
            <ProfileForm />
            <ProfileProjects />
            <ProfileJams />
          </ScrollContainer>
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileScreen;