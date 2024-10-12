import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import AddMediaButton from '../buttons/AddMediaButton';
import AddCollaboratorsButton from '../buttons/AddCollaboratorsButton';

const JamForm = () => {
  const data = ApiClient.get('jams').slice(0, 4);

  return (
    <View style={styles.container}>    
    
      <Text style={GlobalStyles.text}>What kind of Jam is it?</Text>
      <FlatList 
        data={data} 
        numColumns={4}
        contentContainerStyle={{gap: GlobalStyles.gap}}
        columnWrapperStyle={{gap: GlobalStyles.gap}}
        scrollEnabled={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <Text style={GlobalStyles.text}>{item.id}</Text>   
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
});

export default JamForm;