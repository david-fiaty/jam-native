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
    console.log(optionsData)
    return []
    return (optionsData || []).map((item: any) => {
      return {
        value: item?.code?.toLowerCase(),
        label: item?.name,
      }
    });
  };


  const buttons = [
    { 
      id: 'hello',
      element: () => <Text>Hello</Text>,
    }, 
    { 
      id: 'world',
      element: () => <Text>World</Text>,
    }, 
    { 
      id: 'group',
      element: () => <Text>Group</Text>,
    },
  ];

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
