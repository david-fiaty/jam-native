import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import CollapsibleView from '../view/CollapsibleView';
import SpinnerView from '../view/SpinnerView';
import JamStatusButton from '../button/JamStatusButton';
import ListView from '../view/ListView';
import ImageSlideshow from '../slideshow/ImageSlideshow';
import UserManager from '@/manager/UserManager';
import ScreenManager from '@/manager/ScreenManager';
import EntityManager from '@/manager/EntityManager';

const JamsList = () => {  
  const router = useRouter();
  const [jamsData, setJamsData] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isLoggedIn = UserManager.isLoggedIn();

  const renderItem = (row: any) => (
    <View style={styles.listItem}>
      {/* Item header */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemHeader}>
        <BoxView>
          <TouchableOpacity onPress={() => isLoggedIn ? ScreenManager.toggleModal({
            name: 'HostsList',
            entityId: row?.item?.id, 
          }) : router.push('/login')}>
            <TextView>
              @{i18n.t('host')} +{ parseInt(row?.item?.collaborators?.length) }
            </TextView>
          </TouchableOpacity>
        </BoxView>
        <BoxView>
          <JamStatusButton active={row?.item?.is_active} />
        </BoxView>
        <BoxView>
          <IconView name="actions" theme="clear" onPress={() => isLoggedIn ? ScreenManager.toggleModal({
            name: 'MoreJamView',
            entityId: row?.item?.id, 
          }) : router.push('/login') } />
        </BoxView> 
      </BoxView>
      
      {/* Item images */}
      <ImageSlideshow data={row?.item.medias} />

      {/* Item toolbar */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemToolbar}>

        {/* Jammers button */}
        <BoxView direction="row" align="center" onPress={() => isLoggedIn ? ScreenManager.toggleModal({
          name: 'JammersList',
          entityId: row?.item?.id, 
        }) : router.push('/login') }>
          <IconView name="users" theme="tertiary" />
          <TextView>{parseInt(row?.item?.jammers?.length)} {i18n.t('jammers')}</TextView>
        </BoxView>
      
        <BoxView direction="row" align="center">
          {/* Save button */}
          <IconView 
            name="save" 
            theme="tertiary" 
            onPress={() => isLoggedIn ? ScreenManager.toggleModal({
              name: 'SavedJamAction',
              entityId: row?.item?.id, 
            }) : router.push('/login')} 
          />

          {/* Share button */}
          <IconView 
            name="share" 
            theme="tertiary" 
            onPress={() => isLoggedIn ? EntityManager.shareJam(row?.item?.id) : router.push('/login')} 
          />
        </BoxView> 
      </BoxView>

      {/* Item description */}
      <BoxView style={styles.listItemDescription}>
        <TextView>{row?.item?.caption}</TextView>
      </BoxView>

      {/* Item collapsible */}
      <BoxView style={styles.listItemCollapsible}>
        <CollapsibleView 
          label={i18n.t('View more.')} 
          openedLabel={i18n.t('View less.')} 
          content={
            <BoxView direction="column" align="flex-start" style={styles.listItemDetails}>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Location')}: {row?.item?.location_type}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Start')}: {moment(row?.item?.period?.start_datetime).format('MMM Do YYYY')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('End')}: {moment(row?.item?.period?.end_datetime).format('MMM Do YYYY')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Industry')}: {row?.item?.sectors?.[0]?.name}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Sector')}: {row?.item?.sectors?.[0]?.name}</TextView>
              </BoxView>
            </BoxView>
          }
        />
      </BoxView>
    </View>
  );

  if (!jamsData?.length) {
    EntityManager.getJams().then((data: any) => {
      setJamsData(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={jamsData} 
        contentContainerStyle={Layout.listContainer}
        renderItem={(row: any) => renderItem(row)}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base*1.5,
    borderColor: Colors.primary,
  }, 
  listItemHeader: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base/2,
  },
  listItemToolbar: {
    padding: Layout.space.base,
  },
  listItemDescription: {
    padding: Layout.space.base,
  },
  listItemCollapsible: {
    padding: Layout.space.base,
  },
  listItemImage: {
    height: 300,
    backgroundColor: Colors.secondary,
  },
  listItemDetails: {
    gap: Layout.space.base,
    width: '100%',
  },
  listItemDetail: {
    width: '100%',
    gap: 0,
    backgroundColor: Colors.secondary,
    padding: Layout.space.base/6,
    borderRadius: Layout.radius.round,
  },
});

export default JamsList;