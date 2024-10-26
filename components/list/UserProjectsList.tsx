import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import ScreenManager from '@/classes/ScreenManager';
import ListView from '../view/ListView';

const UserProjectsList = () => {  
  const data = ApiClient.get('projects');
  const numColumns = 4;

  const renderItem = (item, index) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <ImageView 
          source={item.image} 
          width="100%"
          height="100%"
          resizeMode="cover"
          style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextView style={styles.title}>{i18n.t('Your Projects')}</TextView>
      <ListView
        data={data} 
        numColumns={numColumns}
        contentContainerStyle={Layout.listContainer}
        columnWrapperStyle={Layout.listColumnWrapper}
        scrollEnabled={false}
        renderItem={({item, index}) => renderItem(item, index)}   
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: Layout.space.base,
  },
  item: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
});

export default UserProjectsList;