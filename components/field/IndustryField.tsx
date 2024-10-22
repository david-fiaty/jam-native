import { StyleSheet } from 'react-native';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

const data = [
  { label: i18n.t('Enabled'), value: 1 },
  { label: i18n.t('Disabled'), value: 0 },
];

const IndustryField = () => {
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase data={data} placeholder={i18n.t('Industries')} />
      <SelectListBase data={data} placeholder={i18n.t('Sub industries')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default IndustryField;