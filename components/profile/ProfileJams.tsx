import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';

const ProfileJams = () => {
  const jams = ApiClient.get('jams').slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved jams</Text> 
      <FlatList 
        data={jams} 
        horizontal={true}  
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <Text style={GlobalStyles.text}>{item.id}</Text>   
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginBottom: 15,
    },
  },
  item: {
    alignSelf: 'center',
    backgroundColor: Colors.tertiary,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 80,
    height: 80,
  },
});

export default ProfileJams;