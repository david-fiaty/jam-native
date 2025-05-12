import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

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
        containerStyle={[styles.groupContainer, containerStyle]}
        buttonContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderWidth: Layout.borderWidth.base, 
    borderColor: Colors.secondary, 
    borderRadius: Layout.radius.round,
  },
  groupContainer: {
    backgroundColor: 'gray',
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    backgroundColor: 'green',
    padding: 0,
    margin: 0,
  },
});

export default ButtonGroupBase;
