import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import InputTextField from '../field/InputTextField';
import TextView from '../view/TextView';


const SignupForm = () => {
  return (
    <>
      <TextView style={styles.label}>{i18n.t('Email')}</TextView>
      <InputTextField
        //value={formData?.email || ''}
        //disabled={isEmailStepValid}
        placeholder={i18n.t('Enter your email address')}
      //onChangeText={(value: string) => updateField('email', value)}
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

export default SignupForm;