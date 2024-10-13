import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import { SafeAreaView } from 'react-native-safe-area-context';
import StaticIcon from '@/components/base/StaticIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        animation="slide"
        label={
          <ClearIcon name="user" />
        }
        content={
          <SafeAreaView style={styles.wrapper}>  
            <ScrollView 
              nestedScrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Pressable>
                <ProfileImage />
                <ProfileForm />
                <ProfileProjects />
                <ProfileJams />
              </Pressable>
            </ScrollView>  
          </SafeAreaView>
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    width: '100%',
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },  
});

export default ProfileScreen;