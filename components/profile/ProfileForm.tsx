import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ApiClient from '@/classes/ApiClient';
import { ProfileProject } from '@/components/profile/ProfileProject';
import { ProfileJam } from '@/components/profile/ProfileJam';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="IG handle"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Where am I now"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Sub industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={styles.input}
        placeholder="Creative organisation"
        placeholderTextColor={GlobalStyles.text.color}
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
  picture: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 5,
    gap: 8,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginTop: 15,
    },
  },
  input: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
});

export default ProfileForm;