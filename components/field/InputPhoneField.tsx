import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { hasFlag } from 'country-flag-icons';
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";
import TextView from "../view/TextView";
import PhoneInput from '@linhnguyen96114/react-native-phone-input';
import CountryPhoneCodeField from "./CountryPhoneCodeField";
import InputTextField from "./InputTextField";
import i18n from "@/translation/i18n";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  label?: any;
  placeholder?: any;
  disabled?: boolean;
  containerStyle?: any;
  onChangeValue?: (value: boolean) => void;
};

const InputPhoneField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
  disabled,
  containerStyle,
  onChangeValue
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  const onChangeEvent = (fieldValue: any) => {
    setCurrentValue(fieldValue);

    if (onChangeValue) {
      onChangeValue(fieldValue)
    }
    else {
      FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      <TextView>{i18n.t('Country')}</TextView>
      <CountryPhoneCodeField
        value={value || ''}
        elementStyle={styles.selectListField}
        //onChangeValue={(option: any) => FormManager.updateField(resource, 'country', option.value, ['string'])}
      />

      <InputTextField
        resource={resource}
        fieldKey={fieldKey}
        rules={rules}
        value={value || ''}
        label={label}
        placeholder={placeholder}
        keyboardType="number-pad"
        containerStyle={containerStyle}
      />
    </>
  );

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <BoxView
        direction="row"
        style={styles.container}
      >
        <PhoneInput
          defaultValue={value}
          defaultCode="FR"
          containerStyle={[containerStyle, styles.container]}
          textInputStyle={styles.textInputStyle}
          layout="first"
          placeholder={placeholder}
          //onChangeText={onChangeEvent}
          countryPickerProps={{
            countryCodes: ['US', 'FR', 'TG'],
          }}
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
  selectListField: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
  },
  textInputStyle: {
    color: Layout.colors.primary,
  },
});

export default InputPhoneField;
