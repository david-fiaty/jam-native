import i18n from '@/translation/i18n';
import SelectListField from './SelectListField';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: string;
};

const PrivacyStatusField = ({ resource, fieldKey, parentKey, rules, value, label, placeholder, onChangeValue }: Props) => {
  const privacyStatuses: any[] = [
    {
      id: 'private',
      label: i18n.t('Private'),
    },
    {
      id: 'public',
      label: i18n.t('Public'),
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
      value={value}
      data={buildOptions(privacyStatuses)}
      label={label}
      placeholder={placeholder}
    />
  );
};

export default PrivacyStatusField;