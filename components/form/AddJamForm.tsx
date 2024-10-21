import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';

export default ({style, children}: BaseProps) => {
  return (
    <BoxView align="flex-start" justify="flex-start">
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent
  },
});
