import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import { isValidPhoneNumber } from 'libphonenumber-js';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";
import TextView from "../view/TextView";
import InputTextField from "./InputTextField";
import i18n from "@/translation/i18n";
import SelectListBase from "../base/SelectListBase";
import StaticData from "@/constants/StaticData";

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  inputlabel?: any;
  selectLabel?: any;
  inputPlaceholder?: any;
  selectPlaceholder?: any;
  disabled?: boolean;
  containerStyle?: any;
  onChangeValue?: (value: boolean) => void;
};

const InputPhoneField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  inputlabel,
  selectLabel,
  inputPlaceholder,
  selectPlaceholder,
  disabled,
  containerStyle,
  onChangeValue
}: Props) => {
  const [currentValue, setCurrentValue] = useState<any>('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const getCountryCodes = () => {
    let countries: any[] = StaticData.countryPhoneCodes;

    if (Config.allowedCountries.phone.length > 0) {
      countries = countries.filter((o: any) => {
        return Config.allowedCountries.phone.includes(o.code);
      });
    }

    return countries.map((o: any) => {
      return {
        value: o.code,
        label: `${o.name} (${o.prefix})`,
      }
    });
  };

  const renderItem = (item: any, selected: boolean) => {
    return (
      <View style={styles.listItem}>
        <TextView>{item?.label}</TextView>
      </View>
    );
  };

  const renderFlag = (code: string) => {
    if (code) {
      return getUnicodeFlagIcon(code.toUpperCase());
    }
  };

  const onChangeCodeValue = (item: any) => {
    setSelectedCountry(StaticData.countryPhoneCodes.find((o: any) => o.code == item.value));
  };

  const onChangePhoneValue = (value: any) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <>
      {FormManager.renderLabel(selectLabel, rules)}

      <SelectListBase
        placeholder={selectPlaceholder}
        value={value}
        data={getCountryCodes()}
        onChangeValue={onChangeCodeValue}
        disabled={disabled}
        elementStyle={styles.selectListField}
        containerStyle={containerStyle}
        renderItem={renderItem}
      />

      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.fieldContainer}
      >
        <InputTextField
          resource={resource}
          fieldKey={fieldKey}
          rules={rules}
          value={selectedCountry?.prefix || ''}
          label={inputlabel}
          placeholder={inputPlaceholder}
          keyboardType="number-pad"
          containerStyle={containerStyle}
          inputContainerStyle={styles.inputContainer}
          onChangeText={onChangePhoneValue}
        />

        <BoxView 
          direction="row" 
          align="center"
          justify="flex-start"
          style={styles.flagContainer}
        >
          <TextView size={18}>
            {renderFlag(selectedCountry?.code)}
          </TextView>
        </BoxView>

      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectListField: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
  },
  fieldContainer: {
    position: 'relative',
  },
  inputContainer: {
    paddingLeft: 30,
  },
  flagContainer: {
    position: 'absolute',
    top: '57%',
    left: Layout.space.base,
  },
  listItem: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default InputPhoneField;
