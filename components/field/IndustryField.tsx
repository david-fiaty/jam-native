import { StyleSheet } from 'react-native';
import { IndustriesData, SubIndustriesData } from '@/constants/Data';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

const IndustryField = () => {
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase data={IndustriesData} placeholder={i18n.t('Industries')} />
      <SelectListBase data={SubIndustriesData} placeholder={i18n.t('Sub industries')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default IndustryField;