import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import MediaField from '../fields/MediaField';
import CollaboratorsField from '../fields/CollaboratorsField';
import TextBlock from '@/components/base/TextBlock';
import SquareOptionsField from '../fields/SquareOptionsField';
import JamCategories from '@/constants/JamCategories';
import TextareaField from '../fields/TextareaField';
import InputTextField from '../fields/InputTextField';

const JamForm = () => {
  const data = JamCategories;

  return (
    <View style={styles.container}>    
      <TextBlock>What kind of Jam is it?</TextBlock>
      <SquareOptionsField data={data} />
      <View style={styles.section}>
        <MediaField /> 
        <CollaboratorsField />
      </View>
      <View style={styles.section}>
        <TextareaField placeholder="Add caption" />
      </View>
      <TextInput
        style={GlobalStyles.field}
        placeholder="Location"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Status"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.field}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
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
});

export default JamForm;