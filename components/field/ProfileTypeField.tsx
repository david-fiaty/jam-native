import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import StaticData from '@/constants/StaticData';
import FormManager from '@/manager/FormManager';
import SelectListField from './SelectListField';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const ProfileTypeField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
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
    else {
      FormManager.updateField(resource, fieldKey, option.value, rules, parentKey);
    }
  };

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
      <BoxView direction="column" align="left" style={styles.container}>
        <SelectListField
          placeholder={placeholder}
          value={value || ''}
          data={buildOptions(profileTypes)}
          onChangeValue={onChangeEvent}
          disabled={disabled}
        />
      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ProfileTypeField;