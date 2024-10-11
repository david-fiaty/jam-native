import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ApiClient from '@/classes/ApiClient';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';

const ProfileScreen = () => {
  const [selected, setSelected] = useState('');
  const projects = ApiClient.get('projects').slice(0, 3);
  const jams = ApiClient.get('jams').slice(0, 3);

  return (
    <View style={styles.container}>    
      <ModalView 
        title="Your profile" 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        content={
          <View style={styles.wrapper}>  
            <ScrollView contentContainerStyle={styles.scroller}>
              <ProfileImage />
              <ProfileForm />
              <ProfileProjects />
              <ProfileJams/>
            </ScrollView>  
          </View>
        }
        animation="slide"
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  wrapper: {
    width: '100%',
    paddingBottom: 40,
  },
  scroller: {
    flexGrow: 1,
  },  
});

export default ProfileScreen;