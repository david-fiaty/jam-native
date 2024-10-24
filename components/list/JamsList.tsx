import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
//import { setTabActive } from "@/redux/slices/TabSlice";
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
    <View style={styles.container}>
      <FlatList 
        data={data} 
        numColumns={1}
        scrollEnabled={true}
        horizontal={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index}) => {
          return (  
            <View style={styles.item}>
              {/* Item header */}
              <BoxView direction="row" align="center" justify="space-between" style={styles.itemHeader}>
                <BoxView>
                  <TouchableOpacity onPress={() => console.log('clicked') /*dispatch(setTabActive('JammersList'))*/ }>
                    <TextView>@{i18n.t('host')} +{item.host_count}</TextView>
                  </TouchableOpacity>
                </BoxView>
                <BoxView>
                  <IconView name="actions" size={22} theme="clear" />
                </BoxView> 
              </BoxView>
              
              {/* Item images */}
              <ImageView source={item.image} resizeMode="cover" style={styles.itemImage} />

              {/* Item toolbar */}
              <BoxView direction="row" align="center" justify="space-between" style={styles.itemToolbar}>
                <BoxView direction="row" align="center">
                  <IconView name="users" size={22} theme="tertiary" />
                  <TextView>{item.host_count} {i18n.t('jammers')}</TextView>
                </BoxView>
                <BoxView direction="row" align="center">
                  <IconView name="save" size={22} theme="tertiary" />
                  <IconView name="share" size={22} theme="tertiary" />
                </BoxView> 
              </BoxView>

              {/* Item description */}
              <BoxView style={styles.itemDescription}>
                <TextView>{item.content}</TextView>
              </BoxView>

              {/* Item collapsible */}
              <BoxView style={styles.itemCollapsible}>
                <CollapsibleView 
                  label={i18n.t('View more.')} 
                  content={
                    <BoxView direction="column" align="flex-start" style={styles.itemDetails}>
                      <View style={styles.itemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.itemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.itemDetail}>
                        <TextView>Sed do eiusmod tempor</TextView>
                      </View>
                      <View style={styles.itemDetail}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  item: {
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    marginBottom: Layout.space.base,
    borderColor: Colors.primary,
  }, 
  itemHeader: {
    padding: Layout.space.base,
  },
  itemToolbar: {
    padding: Layout.space.base,
  },
  itemDescription: {
    padding: Layout.space.base,
  },
  itemCollapsible: {
    padding: Layout.space.base,
  },
  itemImage: {
    height: 300,
    backgroundColor: Colors.secondary,
  },
  itemDetails: {
    width: '100%',
    backgroundColor: 'green',
  },
  itemDetail: {
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
    width: '100%',
  },
});

export default JamsList;