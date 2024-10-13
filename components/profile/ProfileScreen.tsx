import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import { SafeAreaView } from 'react-native-safe-area-context';
import StaticIcon from '../base/StaticIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        label={
          <StaticIcon 
            name="user" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={GlobalStyles.tabs.icon.size} 
          />
        }
        content={
          <SafeAreaView style={styles.wrapper}>  
            <ScrollView 
              nestedScrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Pressable>
                <ProfileImage />
              </Pressable>
              <Pressable>
                <ProfileForm />
              </Pressable>
              <Pressable>
                <ProfileProjects />
              </Pressable>
              <Pressable>
                <ProfileJams />
              </Pressable>
            </ScrollView>  
          </SafeAreaView>
        }
        animation="slide"
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
  icon: {
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
});

export default ProfileScreen;