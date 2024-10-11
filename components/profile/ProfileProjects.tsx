import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';

const ProfileProjects = () => {
  const data = ApiClient.get('projects').slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your projects</Text> 
      <View style={styles.list}>
        {data.map((item, index) => {
          return (
            <View style={styles.item} key={index}>
              <Text style={GlobalStyles.text}>{item.id}</Text>   
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginBottom: 10,
    },
  },
  list: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  item: {
    alignSelf: 'center',
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: 80,
    height: 80,
  },
});

export default ProfileProjects;
