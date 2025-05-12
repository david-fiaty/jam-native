import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';
import ButtonGroupBase from '../base/ButtonGroupBase';

type Props = {
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const PhoneServiceField = ({value, disabled, onChangeValue}: Props) => {
  const phoneServices = StaticData.phoneServices;

  return (    
    <ButtonGroupBase
      value={value}
      data={phoneServices}
      onChangeValue={onChangeValue}
      disabled={disabled}
    />  
  );
};

export default PhoneServiceField;