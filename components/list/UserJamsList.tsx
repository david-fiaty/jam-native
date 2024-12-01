import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import ScreenManager from '@/manager/ScreenManager';
import ListView from '../view/ListView';
import EntityManager from '@/manager/EntityManager';
import SpinnerView from '../view/SpinnerView';

type Props = {
  data?: any,
};

const UserJamsList = ({data} : Props) => {  
  const numColumns = 3;
  const [userJams, setUserJams] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if (!userJams?.length) {
    EntityManager.getJams([20, 54]).then((data: any) => {
      setUserJams(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />
  
  const renderItem = (row: any) => (
    <TouchableOpacity key={row?.item?.id}>
      <View style={styles.item}>
        <ImageView 
          uri={Config.imageUrl + row?.item?.medias?.[0]?.url} 
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

      { userJams?.length > 0 && 
        <ListView
          data={userJams} 
          numColumns={numColumns}
          contentContainerStyle={{gap: Layout.space.base}}
          columnWrapperStyle={{gap: Layout.space.base}}
          scrollEnabled={false}
          renderItem={(row: any) => renderItem(row)}   
        />
      }
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
  linkText: {
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Colors.primary,
    marginBottom: Layout.space.base,
    paddingBottom: Layout.space.base/2,
  },
});

export default UserJamsList;