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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const buildOptions = (optionsData: any) => {
    return optionsData.map((o: any) => {
      return {
        ...o,
        ...{ element: () => <Text>{o.label}</Text>},
      };
    });
  };

  const onChange = ((index: any) => {
    console.log(index);
    setSelectedIndex(index);
    
    //if (onChangeValue) onChangeValue(option);
  });

  return (
    <View style={styles.container}>
      <ButtonGroup 
        onPress={onChange}
        selectedIndex={selectedIndex}
        buttons={buildOptions(data)}
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
