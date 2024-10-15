import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import MediaPickerField from '../fields/MediaPickerField';
import TextBlock from '@/components/base/TextBlock';
import SquareOptionsField from '../fields/SquareOptionsField';
import JamCategories from '@/constants/JamCategories';
import TextareaField from '../fields/TextareaField';
import InputTextField from '../fields/InputTextField';
import CheckboxListField from '../fields/CheckboxListField';
import ApiClient from '@/classes/ApiClient';

const JamForm = () => {
  const jammers = ApiClient.get('jammers');

  return (
    <View style={styles.container}>    
      <TextBlock>What kind of Jam is it?</TextBlock>
      <SquareOptionsField data={JamCategories} />
      <View style={styles.section}>
        <MediaPickerField /> 
        <CheckboxListField 
          label={
            <View style={styles.plus.container}>
              <Ionicons name="add" size={GlobalStyles.icon.size} style={styles.plus.icon} />
              <TextBlock>Add collaborators</TextBlock>
            </View>
          }
          title={<TextBlock>Add collaborators</TextBlock>}
          data={jammers}
        />
      </View>
      <View style={styles.section}>
        <TextareaField placeholder="Add caption" />
      </View>
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Location"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Status"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <InputTextField
        style={GlobalStyles.field}
        placeholder="Sub industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Post" 
          type="solid" 
          titleStyle={{textTransform: 'uppercase'}}
          buttonStyle={styles.button} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    gap: GlobalStyles.space,
  },
  section: {
    marginTop: GlobalStyles.space,
    width: '100%',
  },
  item: {
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 72,
    height: 72,
  },
  caption: {
    ...GlobalStyles.field,
    ...{
      paddingTop: GlobalStyles.space,
      height: 100,
    },
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  plus: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: GlobalStyles.space,
      marginBottom: GlobalStyles.space,
    },
    icon: {
      ...GlobalStyles.icon,
      ...{
        backgroundColor: Colors.tertiary,
        borderColor: Colors.tertiary,
        borderWidth: 1,
        borderRadius: 4,
      },
    },
  },
});

export default JamForm;