import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ButtonView from '@/components/view/ButtonView';

const SignupEmailForm = () => {
  const formData: any = useSelector((state: any) => state.signup);
  
  return (
    <>
      <TextView style={styles.label}>{i18n.t('Email')}</TextView>
      <InputTextField
        //value={formData?.email || ''}
        //disabled={isEmailStepValid}
        placeholder={i18n.t('Enter your email address')}
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

export default SignupEmailForm;