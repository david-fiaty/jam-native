import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '@/components/base/TextBlock';
import { StaticImage } from '../base/StaticImage';

const ProfileJams = () => {
  const data = ApiClient.get('jams');

  return (
    <View style={styles.container}>
      <TextBlock style={styles.title}>Saved Jams</TextBlock> 
      <View style={styles.list}>
        <FlatList 
          data={data} 
          numColumns={3}
          contentContainerStyle={{gap: GlobalStyles.space.base}}
          columnWrapperStyle={{gap: GlobalStyles.space.base}}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity>
                <View style={styles.item}>
                  <StaticImage 
                    source={item.image} 
                    width="100%"
                    height="100%"
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
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
    borderRadius: 8,
    borderColor: Colors.tertiary,
    width: GlobalStyles.space.base*10.3,
    height: GlobalStyles.space.base*10.3,
  },
  image: {
    borderRadius: GlobalStyles.space.base,
  },
});

export default ProfileJams;