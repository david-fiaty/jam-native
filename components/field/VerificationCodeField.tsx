import { BaseProps } from "@/constants/Types";
import TextView from "../view/TextView";
import InputTextField from "./InputTextField";
import i18n from "@/translation/i18n";

type Props = BaseProps & {
  value?: string;
  disabled?: boolean;
  onChangeText: (value: any) => void;
};

const VerificationCodeField = ({ value, disabled, onChangeText }: Props) => {
  return (
    <>
      <TextView>{i18n.t('Verification code sent, check your mailbox')}</TextView>
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
