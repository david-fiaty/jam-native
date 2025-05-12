import StaticData from '@/constants/StaticData';
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