import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";

type Props = {
  data?: {}, 
};

const DropdownSelectBase = ({data}: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <TextView style={styles.label}>{i18n.t('Add collaborators')}</TextView>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownSelectBase;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.secondary,
    width: '100%',
  },
  dropdown: {
    backgroundColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Layout.colors.white,
    left: 22,
    top: 8,
    zIndex: ScreenManager.getModalZIndex(),
    paddingHorizontal: 8,
    fontSize: Layout.fontSize.base,
  },
  placeholderStyle: {
    fontSize: Layout.fontSize.big,
  },
  selectedTextStyle: {
    fontSize: Layout.fontSize.big,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Layout.fontSize.big,
  },
});
