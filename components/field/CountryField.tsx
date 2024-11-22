import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';

type Props = BaseProps & {
  value?: any,
};

const CountryField = ({value}: Props) => {
  const data: any = [];

  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase 
        data={data} 
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