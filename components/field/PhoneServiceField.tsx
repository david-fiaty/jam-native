import StaticData from '@/constants/StaticData';
import ButtonGroupBase from '../base/ButtonGroupBase';
import i18n from '@/translation/i18n';

type Props = {
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const PhoneServiceField = ({ value, disabled, onChangeValue }: Props) => {
  const phoneServices: any[] = [
    {
      id: 'sms',
      label: i18n.t('SMS'),
      default: true,
    },
    {
      id: 'whatsapp',
      label: i18n.t('Whatsapp'),
    },
  ];

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