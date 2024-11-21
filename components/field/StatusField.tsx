import { StyleSheet } from 'react-native';
import { Data } from '@/constants/Data';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

const StatusField = () => {
  const data = Data.statusOptions;

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