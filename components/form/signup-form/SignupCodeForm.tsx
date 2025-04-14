import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from '@/redux/slices/SignupSlice';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ButtonView from '@/components/view/ButtonView';

const SignupCodeForm = () => {
  const dispatch = useDispatch();
  const formData: any = useSelector((state: any) => state.signup);

  const updateData = (key: any, value: any) => {
    dispatch(setValue({
      key: key,
      value: value,
    }));
  };
  
  return (
    <>
      <TextView style={styles.label}>{i18n.t('Verification sent, check your email inbox')}</TextView>
      <InputTextField
        //value={formData?.email || ''}
        //disabled={isEmailStepValid}
        placeholder={i18n.t('Verification code')}
      //onChangeText={(value: string) => updateField('email', value)}
      />

      <ButtonView
        label={i18n.t('Continue')}
        //isProcessing={isProcessing} 
        /*
        onPress={() => {
          setIsProcessing(true);
          submitForm();
        }} 
        */
      />
    </>
  );
};

const styles = StyleSheet.create({
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  },
  label: {
    alignSelf: 'flex-start',
  },
});

export default SignupCodeForm;