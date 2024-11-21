import { StyleSheet } from 'react-native';
import { CreativeOrganizationOptionsData } from '@/constants/Data';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

type Props = BaseProps & {
  selected?: any,
};

const CountryField = ({selected}: Props) => {
  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase 
        data={CreativeOrganizationOptionsData} 
        placeholder={i18n.t('Country')} 
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CountryField;