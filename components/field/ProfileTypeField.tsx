import StaticData from '@/constants/StaticData';
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

  return (
    <SelectListField
      resource={resource}
      fieldKey={fieldKey}
      parentKey={parentKey}
      rules={rules}
      placeholder={placeholder}
      value={value || ''}
      data={buildOptions(profileTypes)}
      onChangeValue={onChangeValue}
      label={label}
      disabled={disabled}
    />
  );
};

export default ProfileTypeField;