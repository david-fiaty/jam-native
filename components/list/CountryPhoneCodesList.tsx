import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import parsePhoneNumber from 'libphonenumber-js';
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import FormManager from '@/manager/FormManager';
import ContentManager from '@/manager/ContentManager';
import InputTextField from '../field/InputTextField';
import i18n from '@/translation/i18n';
import DataManager from '@/manager/DataManager';

type Props = {
  resource: string;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
};

const CountryPhoneCodesList = ({ resource, fieldKey, parentKey, rules, value }: Props) => {
  const listRef: any = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [listData, setListData] = useState<any[]>([]);
  const countryList: any = ContentManager.getCountryPhoneCodes();
  const countryCache: any = new Map<string, any[]>();

  const getListData = (filterValue?: string) => {
    if (filterValue) {
      let key: string = filterValue.toLowerCase();
      let result: any[] = [];

      if (countryCache.has(key)) {
        return countryCache.get(key);
      }

      result = countryList.filter((o: any) => o.key.startsWith(key));
      countryCache.set(key, result);

      return result;
    }

    return countryList;
  };

  const getSelectedCountry = () => {
    if (selectedCountry && typeof selectedCountry !== 'undefined') {
      return selectedCountry;
    }
    else if (value) {
      let parsedNumber: any = parsePhoneNumber(value);
      let targetCountry: any = null;

      if (parsedNumber) {
        targetCountry = listData.find((o: any) => o?.code == parsedNumber.country.toLowerCase());
      }

      return targetCountry;
    }

    return null;
  };

  const clearSearch = async () => {
    setIsSearching(true);
    setIsSearching(false);
    setSearchValue('');
    setListData(getListData());
  };

  const onChangeSearch = (text: string) => {
    setSearchValue(text);
    setListData(getListData(text));
  };

  const renderSearchIcon = () => {
    if (!isSearching && searchValue) {
      return (
        <IconView
          name="delete"
          theme="clear"
          onPress={clearSearch}
        />
      );
    }
    else if (isSearching) {
      return <SpinnerView size="small" />;
    }

    return <></>;
  };

  const toggleItem = (entityId: number) => {
    let targetCountry: any = listData.find((o: any) => o.code == entityId);
    let phoneNumber: string = DataManager.extractPhoneNumber(value);
    let fieldValue: string = targetCountry.prefix;

    if (phoneNumber) {
      fieldValue += phoneNumber;
    }

    setSelectedCountry(targetCountry);

    FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey, {
      countryCode: targetCountry.code,
    });
  };

  const renderItem = (row: any) => {
    let isSelected: boolean = getSelectedCountry()?.code == row?.item?.code;

    return (
      <TouchableOpacity
        key={row?.item?.code}
        onPress={() => toggleItem(row?.item?.code)}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.container}
        >
          <TextView>{row?.item?.name}</TextView>
          {isSelected &&
            <IconView
              name="checkmark"
              theme="clear"
              size={14}
            />
          }
        </BoxView>
      </TouchableOpacity>
    );
  };

  const goToItem = (index: number) => {
    listRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  useEffect(() => {
    if (!isLoaded) {
      setSelectedCountry(getSelectedCountry());
      setListData(getListData());
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      style={Layout.formContainer}
    >
      <InputTextField
        value={getSelectedCountry()?.name || searchValue}
        placeholder={i18n.t('Search...')}
        onChangeText={onChangeSearch}
        rightIcon={renderSearchIcon()}
        theme="white"
      />

      <View style={Layout.borderedListContainer}>
        {listData?.length > 0 &&
          <ListView
            ref={listRef}
            data={listData}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!listData?.length && (
          <TextView>{i18n.t('No results available')}</TextView>
        )}
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.listItem,
    ...{
      padding: Layout.space.base,
    },
  },
});

export default CountryPhoneCodesList;
