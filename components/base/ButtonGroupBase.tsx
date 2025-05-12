import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonGroup } from "@rneui/base";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";

type Props = {
  value?: any;
  data?: object;
  disabled?: boolean;
  containerStyle?: any
  onChangeValue?: (option: any) => void;
};

const ButtonGroupBase = ({value, data, disabled, containerStyle, onChangeValue}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const buildOptions = (optionsData: any) => {
    return optionsData.map((o: any) => {
      return {
        ...o,
        ...{ element: () => <TextView>{o.label}</TextView>},
      };
    });
  };

  const onChange = ((index: any) => {
    console.log(index);
    setSelectedIndex(index);
    
    //if (onChangeValue) onChangeValue(option);
  });

  return (
    <ButtonGroup 
      onPress={onChange}
      selectedIndex={selectedIndex}
      buttons={buildOptions(data)}
      disabled={disabled}
      containerStyle={[styles.groupContainer, containerStyle]}
      buttonContainerStyle={styles.buttonContainer}
      //selectedButtonStyle={{backgroundColor: 'white', }}
      //selectedTextStyle={{ color: Colors.white }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    /*
    backgroundColor: Colors.secondary,
    borderWidth: Layout.borderWidth.base, 
    borderColor: Colors.secondary, 
    borderRadius: Layout.radius.round,
    */
  },
  groupContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: Layout.radius.round,
  },
  buttonContainer: {
    backgroundColor: Colors.secondary,
    padding: 0,
    margin: 0,
  },
});

export default ButtonGroupBase;
