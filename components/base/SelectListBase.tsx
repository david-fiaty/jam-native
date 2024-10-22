import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import { Layout } from "@/constants/Layout";

type Props = {
  data?: object,
  placeholder?: string,
};

const SelectListBase = ({data, placeholder}: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (<></>);
    }
    return null;
  };

  return (
    <View style={[styles.container]}>
      {renderLabel()}
      <Dropdown
        style={[Layout.formField, styles.element]}
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
              <TextView>{item.label}</TextView>
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
    //width: '100%',
    padding: 10,
  },
  placeholderStyle: {
    color: Colors.primary,
    fontSize: Layout.fontSize,
  },
    /*
  field: {
    ...GlobalStyles.field,
  },
  icon: {
    marginRight: GlobalStyles.space.base,
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
    paddingVertical: GlobalStyles.space.base,
    paddingHorizontal: GlobalStyles.space.base,
  },
  placeholderStyle: GlobalStyles.text,
  selectedTextStyle: GlobalStyles.text,
  itemTextStyle: GlobalStyles.text,
  iconStyle: {
    width: GlobalStyles.space.base*2,
    height: GlobalStyles.space.base*2,
  },
  */
});

export default SelectListBase;
