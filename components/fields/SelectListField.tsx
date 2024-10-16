import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { GlobalStyles, Colors } from "@/constants/GlobalStyles";
import TextBlock from "../base/TextBlock";

type Props = {
  data: object,
  placeholder: string,
};

const data = [
  { label: "Public", value: 1 },
  { label: "Private", value: 0 },
];

const SelectListField = ({data, placeholder}: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (<></>);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.field, isFocus && { borderColor: Colors.tertiary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconColor={Colors.primary}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={(item, selected) => {
          return (
            <View style={styles.item}>
              <TextBlock>{item.label}</TextBlock>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: '100%',
  },
  field: {
    ...GlobalStyles.field,
  },
  icon: {
    marginRight: GlobalStyles.space,
  },
  label: {
    ...GlobalStyles.text,
    ...{
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
  },
  item: {
    paddingVertical: GlobalStyles.space,
    paddingHorizontal: GlobalStyles.space,
  },
  placeholderStyle: GlobalStyles.text,
  selectedTextStyle: GlobalStyles.text,
  itemTextStyle: GlobalStyles.text,
  iconStyle: {
    width: GlobalStyles.space*2,
    height: GlobalStyles.space*2,
  },
});

export default SelectListField;
