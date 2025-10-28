import React, { useState, useEffect, JSX } from "react";
import { StyleSheet } from "react-native";
import { Switch } from "@rneui/base";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";

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
    opacity: disabled ? 0.4: 1,
  };

  const onChangeEvent = (fieldValue: any) => {
    setCurrentValue(!fieldValue);
    if (onChangeValue) onChangeValue(!fieldValue);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <BoxView style={[styles.container, disabledStyle]}>
      <Switch
        value={currentValue}
        disabled={disabled}
        onValueChange={onChangeEvent}
      />

      <TextView>{label}</TextView>
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
