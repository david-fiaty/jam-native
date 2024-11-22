import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import ScreenManager from '@/manager/ScreenManager';
import ListView from '../view/ListView';

type Props = {
  data?: any,
};

const UserJamsList = ({data} : Props) => {  
  const numColumns = 3;

  const renderItem = (row: any) => (
    <TouchableOpacity>
      <View style={styles.item}>
        <ImageView 
          uri={Config.imageUrl + row?.item?.medias?.[0].url} 
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
      <TextView style={styles.title}>{i18n.t('Your Jams')}</TextView>

      { data?.length > 0 && 
        <ListView
          data={data} 
          numColumns={numColumns}
          contentContainerStyle={{gap: Layout.space.base}}
          columnWrapperStyle={{gap: Layout.space.base}}
          scrollEnabled={false}
          renderItem={(row: any) => renderItem(row)}   
        />
      }

      {!data?.length && <TextView>{i18n.t('Create a new Jam')}</TextView> } 
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

export default UserJamsList;