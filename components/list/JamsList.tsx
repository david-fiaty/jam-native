import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import CollapsibleView from '../view/CollapsibleView';
import SpinnerView from '../view/SpinnerView';
import JamStatusButton from '../button/JamStatusButton';
import Slideshow from '../slideshow/Slideshow';
import ListView from '../view/ListView';

const JamsList = () => {  
  const data = ApiClient.get('jams');
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  const renderItem = (item, index) => (
    <View style={styles.listItem}>
      {/* Item header */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemHeader}>
        <BoxView>
          <TouchableOpacity onPress={() => dispatch(setActiveScreen('HostsList'))}>
            <TextView>@{i18n.t('host')} +{item.host_count}</TextView>
          </TouchableOpacity>
        </BoxView>
        <BoxView>
          <JamStatusButton active={item.active} />
        </BoxView>
        <BoxView>
          <IconView name="actions" theme="clear" onPress={() => dispatch(setActiveScreen('MoreJamView'))} />
        </BoxView> 
      </BoxView>
      
      {/* Item images */}
      <Slideshow dataType="image" />

      {/* Item toolbar */}
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItemToolbar}>
        {/* Jammers button */}
        <BoxView direction="row" align="center" onPress={() => dispatch(setActiveScreen('JammersList'))}>
          <IconView name="users" theme="tertiary" />
          <TextView>{item.host_count} {i18n.t('jammers')}</TextView>
        </BoxView>
      
        {/* Save button */}
        <BoxView direction="row" align="center">
          <IconView name="save" theme="tertiary" onPress={() => dispatch(setActiveScreen('SaveJamView'))} />
          <IconView name="share" theme="tertiary" onPress={() => dispatch(setActiveScreen('ShareJamView'))} />
        </BoxView> 
      </BoxView>

      {/* Item description */}
      <BoxView style={styles.listItemDescription}>
        <TextView>{item.content}</TextView>
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
                <TextView>{i18n.t('Location')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Timestamp')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Main industry')}</TextView>
              </BoxView>
              <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemDetail}>
                <IconView name="arrow" size={14} theme="transparent" />
                <TextView>{i18n.t('Sub industry')}</TextView>
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
    gap: Layout.space.base/6,
    backgroundColor: Colors.secondary,
    padding: Layout.space.base/6,
    borderRadius: Layout.radius.round,
  },
});

export default JamsList;