import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import ListView from '../view/ListView';
import TextView from '../view/TextView';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenManager from '@/classes/ScreenManager';

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
  
  const renderItem = (item: any, index: number) => (
    <TouchableOpacity onPress={() => router.push(item.path)}>
      <View style={Layout.menuItem}>
        <TextView>{item.label}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Layout.menuContainer}>
      <BackButton
        title={i18n.t('Settings')}
        onPress={() => ScreenManager.toggleModal({
          name: 'SettingsMenu',
        })}
      />
      <ListView 
        data={items} 
        renderItem={(item: any, index: number) => renderItem(item, index)}   
      />
    </View>
  );
};

export default SettingsMenu;