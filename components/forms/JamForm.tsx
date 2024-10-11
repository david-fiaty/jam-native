import { StyleSheet, View, Text, FlatList } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import MegaphoneIcon from '../icons/MegaphoneIcon';
import ApiClient from '@/classes/ApiClient';

const JamForm = () => {
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>    
      <Text style={GlobalStyles.text}>What kind of Jam is it?</Text>
      <MegaphoneIcon size={32} />
      <View style={styles.list}>
        <FlatList 
          data={data} 
          numColumns={3}
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
  },
  list: {
  },
  item: {
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 99,
    height: 99,
  },
});

export default JamForm;