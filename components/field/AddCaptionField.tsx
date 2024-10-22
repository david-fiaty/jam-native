import { StyleSheet } from 'react-native';
import InputTextareaBase from '../base/InputTextareaBase';
import i18n from '@/translation/i18n';

const AddCaptionField = () => {
  return (
    <InputTextareaBase placeholder={i18n.t('Add captiooopppppn')} />
  );
};

const styles = StyleSheet.create({
});

export default AddCaptionField;