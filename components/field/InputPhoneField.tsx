import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js';
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";
import TextView from "../view/TextView";
import InputTextField from "./InputTextField";
import StaticData from "@/constants/StaticData";
import SelectListField from "./SelectListField";

type Props = {
  theme?: string;
  resource?: any;
  fieldKey?: any;
  phoneNumberFieldKey?: any;
  phoneNumberFieldValue?: any;
  phonePrefixFieldKey?: any;
  phonePrefixFieldValue?: any;
  parentKey?: any;
  rules?: any;
  value?: string;
  inputlabel?: any;
  selectLabel?: any;
  inputPlaceholder?: any;
  selectPlaceholder?: any;
  disabled?: boolean;
  containerStyle?: any;
};

const InputPhoneField = ({
  theme,
  resource,
  fieldKey,
  phoneNumberFieldKey,
  phoneNumberFieldValue,
  phonePrefixFieldKey,
  phonePrefixFieldValue,
  parentKey,
  rules,
  value,
  inputlabel,
  selectLabel,
  inputPlaceholder,
  selectPlaceholder,
  disabled,
  containerStyle,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const defaultCountry: any = StaticData.countryPhoneCodes.find((o: any) => o.code == 'tg');

  containerStyle = {
    ...(containerStyle || {}),
    ...(theme == 'white' ? styles.containerStyleWhite : Layout.formField),
  };

  const getCountryOptions = () => {
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
    let targetCountry: any = StaticData.countryPhoneCodes.find((o: any) => o.code == item.value);
    setSelectedCountry(targetCountry);

    FormManager.updateField(resource, phonePrefixFieldKey, targetCountry.prefix, rules, parentKey);
  };

  const onChangePhoneValue = (fieldValue: any) => {
    if (fieldValue) {
      let parsedNumber: any = parsePhoneNumber(fieldValue, selectedCountry.code.toUpperCase());
      if (parsedNumber && parsedNumber.isValid()) {
        fieldValue = new AsYouType().input(selectedCountry.prefix + fieldValue);
        fieldValue = fieldValue.replace(`${selectedCountry.prefix} `, '');
      }

      FormManager.updateField(resource, phoneNumberFieldKey, fieldValue, rules, parentKey, {
        countryCode: selectedCountry.code,
      });
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!countryOptions?.length) {
        setCountryOptions(getCountryOptions());
      }

      if (!selectedCountry) {
        setSelectedCountry(defaultCountry);
      }

      setIsLoaded(true);
    }
  }, [isLoaded, value, selectedCountry, defaultCountry, countryOptions]);

  return (
    <>
      {/* Select list */}
      {FormManager.renderLabel(selectLabel, rules)}

      <SelectListField
        theme={theme}
        resource={resource}
        fieldKey={phonePrefixFieldKey}
        parentKey={parentKey}
        rules={[]}
        placeholder={selectPlaceholder}
        value={selectedCountry?.code}
        data={countryOptions}
        onChangeValue={onChangeCodeValue}
        disabled={disabled}
        elementStyle={styles.selectListField}
        containerStyle={containerStyle}
        renderItem={renderItem}
      />

      {FormManager.renderError(phonePrefixFieldKey, parentKey)}

      {/* Input text */}
      {FormManager.renderLabel(inputlabel, rules)}

      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={[containerStyle, styles.container]}
        gap={Layout.space.base / 1.6}
      >
        <TextView size={15}>
          {renderFlag(selectedCountry?.code)}
        </TextView>

        <TextView>{selectedCountry?.prefix}</TextView>

        <InputTextField
          resource={resource}
          fieldKey={fieldKey}
          parentKey={parentKey}
          value={phoneNumberFieldValue || ''}
          rules={[]}
          placeholder={inputPlaceholder}
          keyboardType="number-pad"
          onChangeText={onChangePhoneValue}
          containerStyle={styles.inputTextField}
        />
      </BoxView>

      {FormManager.renderError(phoneNumberFieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: Layout.space.base,
  },
  containerStyleWhite: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
  selectListField: {
    backgroundColor: Layout.colors.white,
    borderColor: Layout.colors.primary,
  },
  inputTextField: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
  },
  listItem: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default InputPhoneField;
