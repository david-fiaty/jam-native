import { StyleSheet, View, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '@/components/base/TextBlock';

const ProfileProjects = () => {
  const data = ApiClient.get('projects');

  return (
    <View style={styles.container}>
      <TextBlock style={styles.title}>Your projects</TextBlock> 
      <View style={styles.list}>
        <FlatList 
          data={data} 
          numColumns={4}
          contentContainerStyle={{gap: GlobalStyles.space}}
          columnWrapperStyle={{gap: GlobalStyles.space}}
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
    marginTop: GlobalStyles.space*2,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginBottom: GlobalStyles.space/2,
    },
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

export default ProfileProjects;