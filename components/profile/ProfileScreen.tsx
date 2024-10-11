import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ApiClient from '@/classes/ApiClient';
import { ProfileProject } from '@/components/profile/ProfileProject';
import { ProfileJam } from '@/components/profile/ProfileJam';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from './ProfileImage';

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
              <Text style={styles.title}>Your projects</Text> 
              <FlatList 
                style={styles.list}
                data={projects} 
                horizontal={true}  
                renderItem={({item, index}) => <ProfileProject item={item} index={index} />} 
              />
              <Text style={styles.title}>Your jams</Text> 

              <FlatList 
                style={styles.list}
                data={jams} 
                horizontal={true}  
                renderItem={({item, index}) => <ProfileJam item={item} index={index} />} 
              />


              <Text style={styles.title}>Saved jams</Text> 
              <FlatList 
                style={styles.list}
                data={jams} 
                horizontal={true}  
                renderItem={({item, index}) => <ProfileJam item={item} index={index} />} 
              />
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
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 5,
    gap: 8,
  },
});

export default ProfileScreen;