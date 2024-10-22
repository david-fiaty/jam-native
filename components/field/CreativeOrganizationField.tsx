import { StyleSheet } from 'react-native';
import { CreativeOrganizationOptionsData } from '@/constants/Data';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

const CreativeOrganizationField = () => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase data={CreativeOrganizationOptionsData} placeholder={i18n.t('Creative organization')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CreativeOrganizationField;