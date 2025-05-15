import InputTextField from "./InputTextField";
import i18n from "@/translation/i18n";

type Props = {
  value?: string;
  label?: any
  disabled?: boolean;
  onChangeText: (value: any) => void;
};

const VerificationCodeField = ({ value, label, disabled, onChangeText }: Props) => {
  return (
    <>
      {label}
      <InputTextField
        placeholder={i18n.t('Enter verification code')}
        value={value || ''}
        disabled={disabled}
        onChangeText={(value: any) => onChangeText(value) }
      />
    </>
  );
};

export default VerificationCodeField;
