import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const ProfileForm = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>    
      <ModalView 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        title="Your profile" 
        content={
          <View style={styles.wrapper}>  
            <ScrollView contentContainerStyle={styles.scroller}>
              <View style={styles.picture}>
                <FontAwesome name="user-circle" size={86} color={GlobalStyles.icon.color} />
                <Button 
                  type="outline" 
                  buttonStyle={styles.button} 
                  titleStyle={GlobalStyles.text}
                  onPress={() => console.log('Clicked') } 
                >
                  <Ionicons name="cloud-upload-outline" size={20} color={GlobalStyles.icon.color} />
                  <Text style={GlobalStyles.text}>Upload an image</Text> 
                </Button>
              </View>
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
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder="Main industries"
                inputStyles={GlobalStyles.text}
                dropdownTextStyles={GlobalStyles.text}
              />
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder="Sub industries"
                inputStyles={GlobalStyles.text}
                dropdownTextStyles={GlobalStyles.text}
              />
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder="Creatiive organization"
                inputStyles={GlobalStyles.text}
                dropdownTextStyles={GlobalStyles.text}
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
});

const data = [
  {key:'1', value:'Mobiles', disabled:true},
  {key:'2', value:'Appliances'},
  {key:'3', value:'Cameras'},
  {key:'4', value:'Computers', disabled:true},
  {key:'5', value:'Vegetables'},
  {key:'6', value:'Diary Products'},
  {key:'7', value:'Drinks'},
]

export default ProfileForm;