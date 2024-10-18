import { StyleSheet, View, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '../base/StaticImage';

const ProfileProjects = () => {
  const data = ApiClient.get('projects');

  return (
    <View style={styles.container}>
      <TextBlock style={styles.title}>Your projects</TextBlock> 
      <View style={styles.list}>
        <FlatList 
          data={data} 
          numColumns={4}
          contentContainerStyle={{gap: GlobalStyles.space.base}}
          columnWrapperStyle={{gap: GlobalStyles.space.base}}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.item}>
                <StaticImage 
                  source={item.image} 
                  width="100%"
                  height="100%"
                  resizeMode="cover"
                  style={styles.image}
                />
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
    marginTop: GlobalStyles.space.base*2,
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontWeight: 'bold',
      marginBottom: GlobalStyles.space.base/2,
    },
  },
  item: {
    backgroundColor: Colors.tertiary,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: GlobalStyles.space.base*7.25,
    height: GlobalStyles.space.base*7.25,
  },
  image: {
    borderRadius: GlobalStyles.space.base,
  },
});

export default ProfileProjects;