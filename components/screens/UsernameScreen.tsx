import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import ClearIcon from '../icons/ClearIcon';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';

import { GlobalStyles } from '@/constants/GlobalStyles';

const UsernameScreen = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        animation="slide"
        label={<ClearIcon name="user" size={GlobalStyles.tabsbar.icon.size} />}
        content={
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
        }
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  scroll: {
    flexGrow: 1,
  },  
});

export default UsernameScreen;