import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import BackButton from '../button/BackButton';
import SquareOptionsField from '../field/SquareOptionsField';
import MediaPickerField from '../field/MediaPickerField';

const jamCategories = [
  {
    id: 'calls',
    label: 'Calls',
    icon: 'megaphone',
  },
  {
    id: 'looking',
    label: 'Looking',
    icon: 'link',
  },
  {
    id: 'events',
    label: 'Events',
    icon: 'users',
  },
  {
    id: 'random',
    label: 'Random',
    icon: 'infinite',
  },
];

export default ({style, children}: BaseProps) => {
  return (
    <BoxView align="flex-start" justify="flex-start">
      <BackButton title="Add new Jam" onPress={() => console.log('clicked')} />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <SquareOptionsField data={jamCategories} />
      <MediaPickerField />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent
  },
});
