import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ButtonGroup } from "@rneui/themed";

type Props = {
  value?: any;
  data?: object;
  disabled?: boolean;
  onChangeValue?: (option: any) => void;
};

const ButtonGroupBase = ({value, data, disabled, onChangeValue}: Props) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const buttons = [
    { 
      element: () => <Text>Hello</Text>,
    }, 
    { 
      element: () => <Text>World</Text>,
    }, 
    { 
      element: () => <Text>ButtonGroup</Text>,
    }
  ];

  const onChange = ((index: any) => {
    console.log(index);
    //setSelectedValue(option.value);
    //if (onChangeValue) onChangeValue(option);
  });

  return (
    <View style={styles.container}>
      <ButtonGroup 
        onPress={onChange}
        selectedIndex={selectedValue}
        buttons={buttons}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ButtonGroupBase;
