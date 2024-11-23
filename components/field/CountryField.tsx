import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';

type Props = BaseProps & {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const CountryField = ({value, onChangeValue}: Props) => {
  const countriesData: any = StaticData.countries;

  const buildOptions = (optionsData: any) => {
    return optionsData.map((item: any) => {
      return {
        value: item?.code?.toLowerCase(),
        label: item?.name,
      }
    });
  };

  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(countriesData)} 
        placeholder={i18n.t('Country')} 
        onChangeValue={onChangeValue}
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