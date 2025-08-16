import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';
import SectionManager from '@/manager/SectionManager';
import i18n from '@/translation/i18n';

const FilterToolbarView = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => SectionManager.push(router, 'search-filters')}>
      <BoxView
        direction="row"
        align="center"
        justify="space-between"
        style={styles.searchFilters}
      >
        <TextView>{i18n.t('Filter results')}</TextView>
        <IconView
          name="filter"
          theme="transparent"
          padding={0}
          size={16}
        />
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchFilters: {
    width: '100%',
    backgroundColor: 'red',
    padding: Layout.space.base,
  },
});

export default FilterToolbarView;
