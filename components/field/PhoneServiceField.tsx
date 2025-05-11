import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';

type Props = {
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const PhoneServiceField = ({value, disabled, onChangeValue}: Props) => {
  const phoneServices = StaticData.phoneServices;

  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.label,
      }
    });
  };
  
  return (
    <BoxView direction="column" align="left" style={styles.container}>
      <SelectListBase 
        placeholder={i18n.t('Select a phone service')}
        value={value}
        data={buildOptions(phoneServices)}  
        onChangeValue={onChangeValue}
        disabled={disabled}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default PhoneServiceField;