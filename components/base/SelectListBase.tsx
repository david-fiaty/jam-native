import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";

type Props = {
  value?: any, 
  data?: object,
  placeholder?: string,
  onChangeValue?: (option: any) => void,
};

const SelectListBase = ({value, data, placeholder, onChangeValue}: Props) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  if (value && !selectedValue) setSelectedValue(value);

  const onChange = ((option: any) => {
    setSelectedValue(option.value);
    setIsFocus(false);
    if (onChangeValue) onChangeValue(option);
  });

  return (
    <View style={styles.container}>
      <Dropdown
        value={selectedValue}
        data={data}
        style={styles.element}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconColor={Colors.primary}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        renderItem={(item: any, selected) => {
          return (
            <View style={styles.item}>
              <TextView>{item?.label}</TextView>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  element: {
    ...Layout.formField, 
    ...{ padding: Layout.space.base },
  },
  item: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
  placeholderStyle: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
  itemTextStyle: {
    padding: Layout.space.base,
  },
  selectedTextStyle: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
  iconStyle: {},
});

export default SelectListBase;
