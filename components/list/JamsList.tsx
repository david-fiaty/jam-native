import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import ApiClient from '@/classes/ApiClient';
import i18n from '@/translation/i18n';
import ImageView from '../view/ImageView';
import BoxView from '../view/BoxView';
import IconView from '../view/IconView';
import CollapsibleView from '../view/CollapsibleView';

const JamsList = () => {  
  const data = ApiClient.get('jams');
  const dispatch = useDispatch();

  return (
    <BoxView direction="column" style={Layout.listContainer}>
      <FlatList 
        data={data} 
        numColumns={1}
        scrollEnabled={true}
        horizontal={false}
        contentContainerStyle={Layout.list}
        renderItem={({item, index}) => {
          return (  
            <View style={styles.listItem}>
              {/* Item header */}
              <BoxView direction="row" align="center" justify="space-between" style={styles.listItemHeader}>
                <BoxView>
                  <TouchableOpacity onPress={() => dispatch(setTabActive('HostsList'))}>
                    <TextView>@{i18n.t('host')} +{item.host_count}</TextView>
                  </TouchableOpacity>
                </BoxView>
                <BoxView>
                  <IconView name="actions" size={22} theme="clear" onPress={() => dispatch(setTabActive('MoreJamView'))} />
                </BoxView> 
              </BoxView>
              
              {/* Item images */}
              <ImageView source={item.image} resizeMode="cover" style={styles.listItemImage} />

              {/* Item toolbar */}
              <BoxView direction="row" align="center" justify="space-between" style={styles.listItemToolbar}>
                {/* Jammers button */}
                <BoxView direction="row" align="center" onPress={() => dispatch(setTabActive('JammersList'))}>
                  <IconView name="users" size={22} theme="tertiary" />
                  <TextView>{item.host_count} {i18n.t('jammers')}</TextView>
                </BoxView>
              
                {/* Save button */}
                <BoxView direction="row" align="center">
                  <IconView name="save" size={22} theme="tertiary" onPress={() => dispatch(setTabActive('SaveJamView'))} />
                  <IconView name="share" size={22} theme="tertiary" onPress={() => dispatch(setTabActive('ShareJamView'))} />
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
                  content={
                    <BoxView direction="column" align="flex-start" style={styles.listItemDetails}>
                      <View style={styles.listItemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.listItemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.listItemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.listItemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                    </BoxView>
                  }
                />
              </BoxView>
            </View>
          );
        }}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base,
    borderColor: Colors.primary,
  }, 
  listItemHeader: {
    padding: Layout.space.base,
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
    width: '100%',
    backgroundColor: 'green',
  },
  listItemDetail: {
    width: '100%',
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
});

export default JamsList;