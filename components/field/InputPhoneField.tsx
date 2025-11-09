import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js';
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import BoxView from "../view/BoxView";
import FormManager from "@/manager/FormManager";
import TextView from "../view/TextView";
import InputTextField from "./InputTextField";
import SelectListField from "./SelectListField";
import ContentManager from "@/manager/ContentManager";
import ModalManager from "@/manager/ModalManager";

type Props = {
  theme?: string;
  resource?: any;
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
  compact?: boolean;
  containerStyle?: any;
};

const InputPhoneField = ({
  theme,
  resource,
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
  compact,
  containerStyle,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const countryList: any[] = ContentManager.getCountryPhoneCodes();
  const defaultCountry: any = countryList.find((o: any) => o.code == 'tg');

  containerStyle = {
    ...(containerStyle || {}),
    ...(theme == 'white' ? styles.containerStyleWhite : Layout.formField),
  };

  const getCountryOptions = () => {
    let countries: any[] = [...countryList];

    if (Config.allowedCountries.phone.length > 0) {
      countries = countries.filter((o: any) => {
        return Config.allowedCountries.phone.includes(o.code);
      });
    }

    return countries;
  };

  const renderFlag = (code: string) => {
    if (code) {
      return getUnicodeFlagIcon(code.toUpperCase());
    }
  };

  const onChangeCodeValue = (item: any) => {
    let targetCountry: any = countryList.find((o: any) => o.code == item.value);
    setSelectedCountry(targetCountry);

    FormManager.updateField(resource, phonePrefixFieldKey, targetCountry.prefix, rules, parentKey);
  };

  const onChangePhoneValue = (fieldValue: any) => {
    //let targetCountry: any = getSelectedCountry();
    console.log(fieldValue);
    //console.log(targetCountry);

    //console.log(selectedCountry)
    return;

    if (fieldValue) {
      let parsedNumber: any = parsePhoneNumber(fieldValue, targetCountry.code.toUpperCase());
      if (parsedNumber && parsedNumber.isValid()) {
        fieldValue = new AsYouType().input(targetCountry.prefix + fieldValue);
        fieldValue = fieldValue.replace(`${targetCountry.prefix} `, '');
      }

      FormManager.updateField(resource, phoneNumberFieldKey, fieldValue, rules, parentKey, {
        countryCode: targetCountry.code,
      });
    }
  };

  const renderFlagComponent = () => {
    let flagComponent: any = (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
      >
        <TextView size={15}
        >
          {renderFlag(getSelectedCountry()?.code)}
        </TextView>

        <TextView>{getSelectedCountry()?.prefix}</TextView>
      </BoxView>
    );

    if (compact === true) {
      flagComponent = (
        <TouchableOpacity
          onPress={() => {
            ModalManager.toggleModal('CountryPhoneCodesList', {
              resource: resource,
              fieldKey: phoneNumberFieldKey,
              parentKey: parentKey,
              rules: rules,
              value: phoneNumberFieldValue,
            });
          }}
        >
          {flagComponent}
        </TouchableOpacity>
      );
    }

    return flagComponent;
  };

  const renderSelectList = () => {
    return (
      <SelectListField
        theme={theme}
        resource={resource}
        fieldKey={phonePrefixFieldKey}
        parentKey={parentKey}
        rules={[]}
        placeholder={selectPlaceholder}
        value={getSelectedCountry()?.prefix}
        data={countryOptions}
        optionLabelKey="name"
        optionValueKey="code"
        onChangeValue={onChangeCodeValue}
        disabled={disabled}
        elementStyle={styles.selectListField}
        containerStyle={containerStyle}
        search={true}
      />
    );
  };

  const renderInputText = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={[containerStyle, styles.container]}
        gap={Layout.space.base / 1.6}
      >
        {renderFlagComponent()}

        <InputTextField
          resource={resource}
          fieldKey={phoneNumberFieldKey}
          parentKey={parentKey}
          value={getCurrentPhoneNumberValue()}
          rules={[]}
          placeholder={inputPlaceholder}
          //keyboardType="number-pad"
          onChangeText={onChangePhoneValue}
          containerStyle={styles.inputTextField}
        />
      </BoxView>
    );
  };

  const renderComponent = () => {
    if (compact === true) {
      return (
        <>
          {FormManager.renderLabel(inputlabel, rules)}
          {renderInputText()}
          {FormManager.renderError(phoneNumberFieldKey, parentKey)}
        </>
      );
    }
    else {
      return (
        <>
          {FormManager.renderLabel(selectLabel, rules)}
          {renderSelectList()}
          {FormManager.renderError(phonePrefixFieldKey, parentKey)}

          {FormManager.renderLabel(inputlabel, rules)}
          {renderInputText()}
          {FormManager.renderError(phoneNumberFieldKey, parentKey)}
        </>
      );
    }
  };

  const getSelectedCountry = () => {
    if (compact) {
      let targetCountry: any = countryList.find((o: any) => phoneNumberFieldValue.startsWith(o.prefix));
      if (targetCountry) {
        return targetCountry;
      }
    }
    else if (selectedCountry) {
      return selectedCountry;
    }
    else {
      return defaultCountry;
    }
  };

  const getCurrentPhoneNumberValue = () => {
    if (compact) {
      let targetCountry: any = countryList.find((o: any) => phoneNumberFieldValue.startsWith(o.prefix));
      if (targetCountry) {
        phoneNumberFieldValue = phoneNumberFieldValue.replace(targetCountry.prefix, '');
      }
    }

    return phoneNumberFieldValue;
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!countryOptions?.length) {
        setCountryOptions(getCountryOptions());
      }

      setSelectedCountry(getSelectedCountry());
      setIsLoaded(true);
    }
  }, [isLoaded, value, countryOptions]);

  return renderComponent();
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
    paddingLeft: Layout.space.base / 3,
  },
  listItem: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default InputPhoneField;
