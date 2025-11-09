import SelectListField from './SelectListField';
import ContentManager from '@/manager/ContentManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: any;
};

const LocationTypeField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder
}: Props) => {
  const buildOptions = (optionsData: any) => {
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    });
  };

  return (
    <SelectListField
      resource={resource}
      fieldKey={fieldKey}
      parentKey={parentKey}
      rules={rules}
      value={value}
      data={buildOptions(ContentManager.getLocationTypes())}
      label={label}
      placeholder={placeholder}
    />
  );
};

export default LocationTypeField;