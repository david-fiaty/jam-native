import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import i18n from '@/translation/i18n';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: string;
  onChangeValue?: (option: any) => void,
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

  const onChangeEvent = (option: any) => {
    if (onChangeValue) {
      onChangeValue(option);
    }
    else {
      FormManager.updateField(resource, fieldKey, option.value, rules, parentKey);
    }
  };

  const buildOptions = (optionsData: any) => {
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.label,
      }
    });
  };

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <BoxView direction="column" align="center" style={styles.container}>
        <SelectListBase
          value={value}
          data={buildOptions(privacyStatuses)}
          onChangeValue={onChangeEvent}
          placeholder={placeholder}
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

export default PrivacyStatusField;