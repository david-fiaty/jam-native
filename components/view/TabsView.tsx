import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from './BoxView';
import TextView from './TextView';

type Props = {
  tabs: any[];
  currentTab?: any;
  onItemPress?: ((tabId: string) => void);
};

const TabsView = ({ tabs, currentTab, onItemPress }: Props) => {
  const renderTab = (row: any) => {
    const tabStyle: any = row.id == currentTab ? styles.currentTab : {};

    const onTabPress = (tabId: string) => {
      if (onItemPress) {
        onItemPress(tabId);
      }
    };

    return (
      <TouchableOpacity 
        key={row.id}
        onPress={() => onTabPress(row.id)} 
        style={styles.tabItem}
      >
        <TextView style={tabStyle}>{row.label}</TextView>
      </TouchableOpacity>
    );
  };

  return (
    <BoxView 
      direction="row" 
      align="center" 
      justify="flex-start" 
      style={styles.tabContainer}
    >
      <ScrollView 
        horizontal={true}
        style={styles.tabContainer}
      >
        {tabs.map((row: any) => renderTab(row))}
      </ScrollView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    marginTop: Layout.space.base/2,
  },
  tabItem: {
    paddingHorizontal: Layout.space.base,
    paddingBottom: Layout.space.base,
    borderBottomWidth: Layout.borderWidth.base,
    borderBottomColor: Layout.colors.primary,
  },
  currentTab: { 
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: Layout.colors.primary,
    paddingBottom: Layout.space.base, 
    marginBottom: -Layout.space.base,
  },
});

export default TabsView;
