import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import parsePhoneNumber, { AsYouType, getCountries, getCountryCallingCode } from 'libphonenumber-js';
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
import UserManager from "@/manager/UserManager";
import DataManager from "@/manager/DataManager";

type Props = {
  theme?: string;
  resource?: any;
  phoneNumberFieldKey?: any;
  phoneNumberFieldValue?: any;
  phonePrefixFieldKey?: any;
  phonePrefixFieldValue?: any;
  parentKey?: any;
  rules?: any;
  inputlabel?: any;
  selectLabel?: any;
  inputPlaceholder?: any;
  selectPlaceholder?: any;
  disabled?: boolean;
  compact?: boolean;
  containerStyle?: any;
  formatPhoneNumber?: boolean;
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
  inputlabel,
  selectLabel,
  inputPlaceholder,
  selectPlaceholder,
  disabled,
  compact,
  containerStyle,
  formatPhoneNumber,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [defaultCountry, setDefaultCountry] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const countryList: any[] = ContentManager.getCountryPhoneCodes();

  formatPhoneNumber = formatPhoneNumber === false ? false : true;

  containerStyle = {
    ...(containerStyle || {}),
    ...(theme == 'white' ? styles.containerStyleWhite : Layout.formField),
  };

  const getDefaultCountry = async () => {
    let code: string = Config.defaultCountry;
    let locationAddress: any = await UserManager.getLocationAddress();

    if (locationAddress && locationAddress?.isoCountryCode) {
      code = locationAddress.isoCountryCode.toLowerCase();
    }

    return countryList.find((o: any) => o.code == code);
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
    let targetCountry: any = getSelectedCountry();

    if (targetCountry && compact === true) {
      fieldValue = targetCountry.prefix + (fieldValue || '').replaceAll(' ', '');
    }

    FormManager.updateField(resource, phoneNumberFieldKey, fieldValue, rules, parentKey, {
      countryCode: targetCountry.code,
    });
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
        value={getSelectedCountry()?.code}
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
          value={getCurrentPhoneNumber()}
          rules={[]}
          placeholder={inputPlaceholder}
          keyboardType="number-pad"
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
    if (compact && phoneNumberFieldValue) {
      let phonePrefix: any = DataManager.extractPhonePrefix(phoneNumberFieldValue);
      let targetCountry: any = countryList.find((o: any) => o.prefix == phonePrefix);

      if (targetCountry) {
        return targetCountry;
      }
      else {
        return defaultCountry;
      }
    }
    else if (selectedCountry) {
      return selectedCountry;
    }
    else {
      return defaultCountry;
    }
  };

  const getCurrentPhoneNumber = () => {
    let phonePrefix: any = DataManager.extractPhonePrefix(phoneNumberFieldValue);
    let targetCountry: any = countryList.find((o: any) => o.prefix == phonePrefix);
    let fieldValue: string = '';

    if (targetCountry && phoneNumberFieldValue) {
      fieldValue = DataManager.extractPhoneNumber(phoneNumberFieldValue);

      //console.log(phonePrefix, fieldValue)
      //console.log('aaa', parsePhoneNumber(phonePrefix + fieldValue))
      //console.log(new AsYouType('VG').input(phonePrefix + fieldValue));
      
      //console.log('111111111', parsePhoneNumber('+128490880983'))
      //console.log('222222222', parsePhoneNumber('+22890880983'))

      if (formatPhoneNumber) {
        let parsedNumber: any = parsePhoneNumber(phonePrefix + fieldValue);

        if (parsedNumber && phonePrefix == `+${parsedNumber.countryCallingCode}`) {
          
        }
        else {

        }
      }
    }

    return fieldValue;
  };

  useEffect(() => {
    (async () => {
      setDefaultCountry(await getDefaultCountry());
    })();

    if (!isLoaded) {
      setCountryOptions(getCountryOptions());
      setDefaultCountry(getDefaultCountry());
      setSelectedCountry(getSelectedCountry());
      setIsLoaded(true);
    }
  }, [isLoaded, countryOptions]);

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
    backgroundColor: 'red',
    borderWidth: 0,
    paddingLeft: 0,
  },
  listItem: {
    paddingVertical: Layout.space.base,
    paddingHorizontal: Layout.space.base,
  },
});

export default InputPhoneField;
