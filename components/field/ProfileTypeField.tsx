import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const ProfileTypeField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value, 
  disabled, 
  onChangeValue
}: Props) => {
  const profileTypes = StaticData.profileTypes;

  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.label,
      }
    });
  };

  const onChangeEvent = (option: any) => {
    if (onChangeValue) {
      onChangeValue(option);
    }
    else if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, option.value, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, option.value, rules);
    }
  };
  
  return (
    <BoxView direction="column" align="left" style={styles.container}>
      <SelectListBase 
        placeholder={i18n.t('Select a profile type')}
        value={value || ''}
        data={buildOptions(profileTypes)}  
        onChangeValue={onChangeEvent}
        disabled={disabled}
      />

      {FormManager.renderError(fieldKey, parentKey)}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ProfileTypeField;