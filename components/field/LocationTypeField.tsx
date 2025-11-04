import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';
import EntityManager from '@/manager/EntityManager';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: any;
  onChangeValue?: (option: any) => void,
};

const LocationTypeField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
  onChangeValue
}: Props) => {

  const onChangeEvent = (fieldValue: any) => {
    if (onChangeValue) {
      onChangeValue(fieldValue);
    }
    else if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, fieldValue, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, fieldValue, rules);
    }
  };

  const buildOptions = (optionsData: any) => {
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    });
  };

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
      <BoxView direction="column" align="center" style={styles.container}>
        <SelectListBase
          value={value}
          data={buildOptions(EntityManager.getLocationTypes())}
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

export default LocationTypeField;