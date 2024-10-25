import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import { ListItemProps } from '@/constants/Types';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';

type ItemProps = {
  label: string,
  path: string,
};

const items: ItemProps[] = [
  {
    label: 'Account information',
    path: '/account',
  },
  {
    label: 'Change password',
    path: '/password',
  },
  {
    label: 'Language',
    path: '/language',
  },
];

const SettingsMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  return (
    <View style={styles.container}>
      <BackButton
        title={i18n.t('Settings')}
        onPress={() => dispatch(setTabActive('SettingsMenu'))}
      />
      <ListView 
        data={items} 
        renderItem={({item, index}: ListItemProps) => {
          return (
            <TouchableOpacity onPress={() => router.push('/account')}>
              <View style={styles.item}>
                <TextView>{item.label}</TextView>
              </View>
            </TouchableOpacity>
          );
        }}   
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  item: Layout.menuItem,
  label: Layout.menuItemLabel,
});

export default SettingsMenu;