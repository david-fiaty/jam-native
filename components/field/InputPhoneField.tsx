import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import { isValidPhoneNumber } from 'libphonenumber-js';
import parsePhoneNumber from 'libphonenumber-js'
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const defaultCountry: any = StaticData.countryPhoneCodes.find((o: any) => o.code == 'tg');

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
  };

  const onChangePhoneValue = (fieldValue: any) => {
    setPhoneNumber(fieldValue);

    if (selectedCountry?.code) {
      let parsedNumber: any = parsePhoneNumber(fieldValue, selectedCountry.code.toUpperCase());
      
      if (parsedNumber && parsedNumber.isValid()) {
        // Todo - Update form data
        console.log(phoneNumber)
        console.log(selectedCountry)
        //console.log(parsedNumber);
      }
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
      {FormManager.renderLabel(selectLabel, rules)}
      {/* Select list */}
      <SelectListBase
        placeholder={selectPlaceholder}
        value={selectedCountry?.code || ''}
        data={countryOptions}
        onChangeValue={onChangeCodeValue}
        disabled={disabled}
        elementStyle={styles.selectListField}
        containerStyle={containerStyle}
        renderItem={renderItem}
      />

      {FormManager.renderError(fieldKey, parentKey)}

      {/* Input text */}
      {FormManager.renderLabel(inputlabel, rules)}

      <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={[containerStyle, styles.container]}
        gap={Layout.space.base/1.6}
      >
        <TextView size={18}>
          {renderFlag(selectedCountry?.code)}
        </TextView>

        <TextView>{selectedCountry?.prefix}</TextView>
        
        <InputTextField
          resource={resource}
          fieldKey={fieldKey}
          value={phoneNumber || ''}
          rules={rules}
          placeholder={inputPlaceholder}
          keyboardType="number-pad"
          onChangeText={onChangePhoneValue}
          containerStyle={styles.inputTextField}
        />
      </BoxView>

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: Layout.space.base,
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
