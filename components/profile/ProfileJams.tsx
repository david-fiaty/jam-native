import { StyleSheet, View, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '../base/TextBlock';

const ProfileJams = () => {
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <TextBlock>Saved Jams</TextBlock> 
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
                <TextBlock>{item.id}</TextBlock>   
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

export default ProfileJams;