import { ButtonGroup } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  value?: any;
  data?: object;
  onChangeValue?: (option: any) => void;
};

const component1 = () => <Text>Hello</Text>
const component2 = () => <Text>World</Text>
const component3 = () => <Text>ButtonGroup</Text>

const ButtonGroupBase = ({value, data, onChangeValue}: Props) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]

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
