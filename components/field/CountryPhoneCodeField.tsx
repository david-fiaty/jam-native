import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';
import SelectListField from './SelectListField';

type Props = {
  value?: any;
  disabled?: any;
  containerStyle?: any;
  elementStyle?: any;
  onChangeValue?: (option: any) => void;
};

const CountryPhoneCodeField = ({value, disabled, containerStyle, elementStyle, onChangeValue}: Props) => {
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
      <SelectListField
        placeholder={i18n.t('Select your country')}
        value={value}
        data={buildOptions(countryCodes)}  
        onChangeValue={onChangeValue}
        disabled={disabled}
        elementStyle={elementStyle}
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