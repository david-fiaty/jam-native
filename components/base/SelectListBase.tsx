import React, { JSX, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";

type Props = {
  value?: any;
  data?: object;
  placeholder?: string;
  disabled?: any;
  containerStyle?: any;
  elementStyle?: any;
  onChangeValue?: (option: any) => void;
  renderItem?: (item: any, selected: boolean) => JSX.Element;
};

const SelectListBase = ({ value, data, placeholder, disabled, elementStyle, containerStyle, onChangeValue, renderItem }: Props) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  elementStyle = {
    ...styles.element,
    ...(disabled === true ? styles.disabled : {}),
    ...(elementStyle || {}),
  };

  if (value && !selectedValue) setSelectedValue(value);

  const onChange = (option: any) => {
    setSelectedValue(option.value);
    setIsFocus(false);
    if (onChangeValue) onChangeValue(option);
  };

  const renderOption = (item: any, selected: boolean) => {
    if (renderItem) {
      return renderItem(item, selected);
    }
    else {
      return (
        <View style={styles.listItem}>
          <TextView>{item?.label}</TextView>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        value={selectedValue}
        data={data}
        style={elementStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.listItemTextStyle}
        containerStyle={containerStyle}
        search={false}
        disable={disabled}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        iconColor={Layout.colors.primary}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        renderItem={renderOption}
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
  disabled: {
    opacity: 0.5,
  },
  listItem: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
  placeholderStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  itemTextStyle: {
    padding: Layout.space.base,
  },
  selectedTextStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  iconStyle: {},
});

export default SelectListBase;
