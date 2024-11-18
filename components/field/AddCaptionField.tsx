import InputTextareaField from '../field/InputTextareaField';
import i18n from '@/translation/i18n';

const AddCaptionField = () => {
  return (
    <InputTextareaField placeholder={i18n.t('Add caption')} />
  );
};

export default AddCaptionField;