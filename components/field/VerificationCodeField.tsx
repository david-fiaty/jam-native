import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { BaseProps } from "@/constants/Types";
import { Colors } from "@/constants/Colors";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import InputTextField from "./InputTextField";
import i18n from "@/translation/i18n";

type Props = BaseProps & {
  value?: string;
  onChangeText: (value: any) => void;
};

const VerificationCodeField = ({ value, onChangeText }: Props) => {
  return (
    <>
      <TextView>{i18n.t('Verification code sent, check your mailbox')}</TextView>
      <InputTextField
        placeholder={i18n.t('Enter verification code')}
        value={value || ''}
        onChangeText={(value: any) => onChangeText(value) }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default VerificationCodeField;
