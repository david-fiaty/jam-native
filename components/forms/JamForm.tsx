import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import AddMediaButton from '../buttons/AddMediaButton';
import AddCollaboratorsButton from '../buttons/AddCollaboratorsButton';
import TextBlock from '../base/TextBlock';

const JamForm = () => {
  const data = ApiClient.get('jams').slice(0, 4);

  return (
    <View style={styles.container}>    
    
      <TextBlock>What kind of Jam is it?</TextBlock>
      <FlatList 
        data={data} 
        numColumns={4}
        contentContainerStyle={{gap: GlobalStyles.gap}}
        columnWrapperStyle={{gap: GlobalStyles.gap}}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <TextBlock>{item.id}</TextBlock>   
            </View>
          );
        }}
      />
    
      <View style={styles.section}>
        <AddMediaButton size={20} /> 
        <AddCollaboratorsButton size={20} />
      </View>
    
      <View style={styles.section}>
        <TextInput
          style={styles.caption}
          placeholder="Add caption"
          placeholderTextColor={GlobalStyles.text.color}
          multiline={true}
          numberOfLines={4}
          maxLength={200}
          textAlignVertical="top"
        />
      </View>

      <TextInput
        style={GlobalStyles.input}
        placeholder="Main industries"
        placeholderTextColor={GlobalStyles.text.color}
      />
      <TextInput
        style={GlobalStyles.input}
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
    gap: GlobalStyles.gap,
  },
  section: {
    marginTop: GlobalStyles.gap,
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
    ...GlobalStyles.input,
    ...{
      paddingTop: GlobalStyles.gap,
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