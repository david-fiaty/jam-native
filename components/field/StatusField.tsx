import { StyleSheet } from 'react-native';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

const data = [
  { label: i18n.t('Enabled'), value: 1 },
  { label: i18n.t('Disabled'), value: 0 },
];

const StatusField = () => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase data={data} placeholder={i18n.t('Status')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default StatusField;