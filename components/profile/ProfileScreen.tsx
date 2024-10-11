import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        content={
          <SafeAreaView style={styles.wrapper}>  
            <ScrollView style={styles.scroll}>
              <ProfileImage />
              <ProfileForm />
              <ProfileProjects />
              <ProfileJams />
            </ScrollView>  
          </SafeAreaView>
        }
        animation="slide"
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  wrapper: {
    width: '100%',
    flex: 1,
    height: Dimensions.get('screen').height,
  },
  scroll: {

  },  
});

export default ProfileScreen;