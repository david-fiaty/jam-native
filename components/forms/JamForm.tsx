import { StyleSheet, View, Text, FlatList } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';

const JamForm = () => {
  const data = ApiClient.get('jams').slice(0, 4);

  return (
    <View style={styles.container}>    
      <Text style={GlobalStyles.text}>What kind of Jam is it?</Text>
      <View style={styles.list}>
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
    marginTop: GlobalStyles.gap,
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
});

export default JamForm;