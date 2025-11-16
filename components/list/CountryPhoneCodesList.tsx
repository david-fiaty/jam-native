import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, shallowEqual } from 'react-redux';
import { Layout } from "@/constants/Layout";
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js';
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
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [listData, setListData] = useState<any[]>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const appState: any = useSelector((state: any) => state.app, shallowEqual);
  const countryList: any = ContentManager.getCountryPhoneCodes();

  const getListData = (filterValue?: string) => {
    if (filterValue) {
      return countryList.filter((o: any) => o.name.toLowerCase().startsWith(filterValue.toLowerCase()));
    }

    return countryList;
  };

  const getSelectedIds = () => {
    let parsedNumber: any = parsePhoneNumber(value);

    if (parsedNumber) {
      return [parsedNumber.country.toLowerCase()];
    }

    return [];
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

    setSelectedIds([entityId]);
    FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
  };

  const renderItem = (row: any) => {
    let targetCountry: any = listData.find((o: any) => o.code == row.item.code);
    let isSelected: boolean = selectedIds.includes(targetCountry.code);

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

  useEffect(() => {
    if (!isLoaded) {
      setSelectedIds(getSelectedIds());
      setListData(getListData());
      setIsLoaded(true);
    }
  }, [formData, fieldKey, parentKey, selectedIds, appState]);

  if (!isLoaded) return <SpinnerView />;

  //console.log(value)
  //console.log(parsePhoneNumber(value))

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      style={Layout.formContainer}
    >
      <InputTextField
        value={searchValue}
        placeholder={i18n.t('Search...')}
        onChangeText={onChangeSearch}
        rightIcon={renderSearchIcon()}
        theme="white"
      />

      <View style={Layout.borderedListContainer}>
        {listData?.length > 0 &&
          <ListView
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
