import React, { useState, useEffect, JSX } from "react";
import { StyleSheet } from "react-native";
import { Switch } from "@rneui/base";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  value?: string;
  label?: string;
  disabled?: boolean;
  onChangeValue?: (value: boolean) => void;
};

const InputSwitchField = ({
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
      if (onChangeValue) onChangeValue(!previousState);
      return !previousState;
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
