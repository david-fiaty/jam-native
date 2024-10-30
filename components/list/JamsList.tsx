import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
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
import DataManager from '@/classes/DataManager';
import ImageSlideshow from '../slideshow/ImageSlideshow';

const JamsList = () => {  
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const listViewRef = useRef(null);

  const scrollToItem = (id: number) => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1 && listViewRef.current) {
      listViewRef.current.scrollToIndex({ animated: true, index });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await DataManager.get('jams');

      setTimeout(() => {
        setData(data);
      }, Layout.animation.duration);


      scrollToItem(24);
    })();
  });

  if (!data) return <SpinnerView />;

  const renderItem = (item, index) => (
    <View style={styles.listItem}>
      {/* Item header */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemHeader}>
        <BoxView>
          <TouchableOpacity onPress={() => dispatch(setActiveScreen({
            name: 'HostsList',
            entityId: item.id, 
          }))}>
            <TextView>
              @{i18n.t('host')} +{parseInt(item?.hosts?.length)} {item.id}
            </TextView>
          </TouchableOpacity>
        </BoxView>
        <BoxView>
          <JamStatusButton active={item?.active} />
        </BoxView>
        <BoxView>
          <IconView name="actions" theme="clear" onPress={() => dispatch(setActiveScreen({
            name: 'MoreJamView',
            entityId: item?.id, 
          }))} />
        </BoxView> 
      </BoxView>
      
      {/* Item images */}
      <ImageSlideshow data={item.medias} />

      {/* Item toolbar */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemToolbar}>
        {/* Jammers button */}
        <BoxView direction="row" align="center" onPress={() => dispatch(setActiveScreen({
          name: 'JammersList',
          entityId: item.id, 
        }))}>
          <IconView name="users" theme="tertiary" />
          <TextView>{parseInt(item?.jammers?.length)} {i18n.t('jammers')}</TextView>
        </BoxView>
      
        {/* Save button */}
        <BoxView direction="row" align="center">
          <IconView name="save" theme="tertiary" onPress={() => dispatch(setActiveScreen({
            name: 'SaveJamView',
            entityId: item.id, 
          }))} />
          <IconView name="share" theme="tertiary" onPress={() => dispatch(setActiveScreen({
            name: 'ShareJamView',
            entityId: item.id, 
          }))} />
        </BoxView> 
      </BoxView>

      {/* Item description */}
      <BoxView style={styles.listItemDescription}>
        <TextView>{item?.description}</TextView>
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
                <TextView>{i18n.t('Location')}: {item?.location}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Start')}: {moment(item?.period?.start_datetime).format('MMM Do YYYY')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('End')}: {moment(item?.period?.end_datetime).format('MMM Do YYYY')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Industry')}: {item?.sectors?.[0]?.name}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Sector')}: {item?.sectors?.[0]?.name}</TextView>
              </BoxView>
            </BoxView>
          }
        />
      </BoxView>
    </View>
  );

  return (
    <BoxView direction="column" style={Layout.screenContent}>
      <ListView
        data={data} 
        contentContainerStyle={Layout.listContainer}
        renderItem={({item, index}) => renderItem(item, index)}
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