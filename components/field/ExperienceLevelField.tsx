import i18n from '@/translation/i18n';
import SelectListField from './SelectListField';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  label?: any;
  placeholder?: any;
  value?: any;
};

const ExperienceLevelField = ({ resource, fieldKey, parentKey, rules, label, placeholder, value }: Props) => {
  const experienceLevels: any[] = [
    {
      id: null,
      label: i18n.t('Select a level of experience'),
    },
    {
      id: 'less_than_1_year',
      label: i18n.t('Less than 1 year'),
    },
  ];

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
      label={label}
      placeholder={placeholder}
      value={value}
      data={buildOptions(experienceLevels)}
    />
  );
};

export default ExperienceLevelField;