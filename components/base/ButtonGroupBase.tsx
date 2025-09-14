import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonGroup } from '@rneui/base';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";

type Props = {
  value?: any;
  data: any[];
  disabled?: boolean;
  containerStyle?: any
  onChangeValue?: (option: any) => void;
};

const ButtonGroupBase = ({value, data, disabled, containerStyle, onChangeValue}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const buildOptions = () => {
    return data.map((o: any) => {
      return {
        ...o,
        ...{ element: (target: any) => {
          return (
            <TextView style={target.isSelected ? styles.selectedItem : {}}>
              {o.label}
            </TextView>
          );
        }},
      };
    });
  };

  const onChange = ((index: any) => {
    setSelectedIndex(index);
    if (onChangeValue) onChangeValue(data[index]);
  });

  useEffect(() => {
    if (value) {
      setSelectedIndex(data.findIndex((o: any) => o.id === value));
    }
  }, [value, data]);

  return (
    <ButtonGroup 
      buttons={buildOptions()}
      onPress={onChange}
      selectedIndex={selectedIndex}
      disabled={disabled}
      containerStyle={[styles.groupContainer, containerStyle]}
      buttonContainerStyle={styles.buttonContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  groupContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: Layout.radius.round,
  },
  buttonContainer: {
    backgroundColor: Layout.colors.secondary,
    padding: 0,
    margin: 0,
  },
  selectedItem: {
    color: Layout.colors.white,
  },
});

export default ButtonGroupBase;
