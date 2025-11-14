import React, { useState, useEffect, JSX } from "react";
import { StyleSheet, Switch } from "react-native";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import FormManager from "@/manager/FormManager";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  label?: string;
  disabled?: boolean;
  onChangeValue?: (value: boolean) => void;
};

const InputSwitchField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  disabled,
  onChangeValue
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');

  const disabledStyle: any = {
    opacity: disabled ? 0.4 : 1,
  };

  const onChangeEvent = () => {
    setCurrentValue((previousState: boolean) => {
      let fieldValue: boolean = !previousState;

      if (onChangeValue) {
        onChangeValue(fieldValue);
      }
      else {
        FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
      }

      return fieldValue;
    });
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <BoxView
      direction="row"
      align="center"
      justify="space-between"
      style={[styles.container, disabledStyle]}
    >
      <BoxView
        direction="row"
        align="center"
      >
        <TextView>{label}</TextView>
      </BoxView>

      <BoxView
        direction="row"
        align="center"
      >
        <TextView>{currentValue === true ? i18n.t('Yes') : i18n.t('No')}</TextView>

        <Switch
          value={currentValue}
          disabled={disabled}
          onValueChange={onChangeEvent}
        />
      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainerStyle: {
    width: '100%',
    height: '100%',
  },
});

export default InputSwitchField;
