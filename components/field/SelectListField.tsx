import React, { JSX, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import FormManager from "@/manager/FormManager";

type Props = {
  theme?: string;
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  data?: any;
  label?: any;
  placeholder?: string;
  disabled?: any;
  containerStyle?: any;
  elementStyle?: any;
  optionValueKey?: any;
  optionLabelKey?: any;
  search?: boolean;
  onChangeValue?: (option: any) => void;
  renderItem?: (item: any, selected: boolean) => JSX.Element;
};

const SelectListField = ({
  theme,
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  data,
  label,
  placeholder,
  disabled,
  containerStyle,
  elementStyle,
  optionValueKey,
  optionLabelKey,
  search,
  onChangeValue,
  renderItem
}: Props) => {
  const [listData, setListData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  elementStyle = {
    ...styles.element,
    ...(disabled === true ? styles.disabled : {}),
    ...(elementStyle || {}),
    ...(theme == 'white' ? {} : Layout.formField),
  };

  containerStyle = {
    ...(containerStyle || {}),
  };

  const buildOptions = (optionsData: any) => {
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.[optionValueKey],
        label: item?.[optionLabelKey],
      }
    });
  };

  const onChange = (option: any) => {
    if (onChangeValue) {
      if (onChangeValue) onChangeValue(option);
    }
    else {
      FormManager.updateField(resource, fieldKey, option.value, rules, parentKey);
    }
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

  useEffect(() => {
    setListData(buildOptions(data));
  }, [isLoaded, data]);

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <View style={styles.container}>
        <Dropdown
          value={value}
          data={listData}
          style={elementStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          containerStyle={containerStyle}
          search={search}
          disable={disabled}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          iconColor={Layout.colors.primary}
          onChange={onChange}
          renderItem={renderOption}
        />
      </View>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
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

export default SelectListField;
