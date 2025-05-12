import StaticData from '@/constants/StaticData';
import ButtonGroupBase from '../base/ButtonGroupBase';

type Props = {
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const PhoneServiceField = ({value, disabled, onChangeValue}: Props) => {
  return (    
    <ButtonGroupBase
      value={value}
      data={StaticData.phoneServices}
      onChangeValue={onChangeValue}
      disabled={disabled}
    />  
  );
};

export default PhoneServiceField;