import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';

type Props = {
  value?: any;
  disabled?: any;
  containerStyle?: any;
  onChangeValue?: (option: any) => void;
};

const CountryPhoneCodeField = ({value, disabled, containerStyle, onChangeValue}: Props) => {
  const countryCodes = StaticData.countryPhoneCodes;

  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item.code,
        label: `${item.name} (${item.prefix})`,
      }
    });
  };
  
  return (
    <BoxView direction="column" align="left" style={styles.container}>
      <SelectListBase 
        placeholder={i18n.t('Select your country')}
        value={value}
        data={buildOptions(countryCodes)}  
        onChangeValue={onChangeValue}
        disabled={disabled}
        containerStyle={containerStyle}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CountryPhoneCodeField;