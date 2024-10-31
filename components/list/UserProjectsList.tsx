import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import ScreenManager from '@/classes/ScreenManager';
import ListView from '../view/ListView';

type Props = {
  data?: object,
};

const UserProjectsList = ({data}: Props) => {  
  const numColumns = 4;

  const renderItem = (item, index) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <ImageView 
          source={{uri: Config.imageUrl + item?.url}} 
          width={96.7}
          height={96.7}
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
        contentContainerStyle={{gap: Layout.space.base}}
        columnWrapperStyle={{gap: Layout.space.base}}
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
    width: 96.7,
    height: 96.7,
  },
});

export default UserProjectsList;