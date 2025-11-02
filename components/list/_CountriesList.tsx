import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import InputTextField from '../field/InputTextField';

type Props = {
  resource: string;
  field?: any;
  multiple?: boolean;
};

const CountriesList = ({ resource, field, multiple }: Props) => {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const clearSearch = () => {
    setSearchResults(countriesData);
    setSearchValue('');
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

  const triggerSearch = (value?: any) => {
    let results: any = countriesData;
    let needle: string = value || searchValue || null;

    setSearchValue(needle);

    if (needle) {
      setIsSearching(true);
      
      results = countriesData.filter((o: any) => {
        return o.name.replace(/\s+/g, '').toLowerCase().includes(needle.replace(/\s+/g, '').toLowerCase()); 
      });

      setIsSearching(false);
    } 
    
    setSearchResults(results);
  };

  const toggleItem = (row: any) => {
    let idArray = [...selectedCountries];

    if (multiple === true) {
      if (idArray.includes(row.item.code)) {
        idArray = idArray.filter((value: number) => value !== row.item.code);
      }
      else {
        idArray.push(row.item.code);
      }
    }
    else {
      idArray = [row.item.code];
    }

    setSelectedCountries(idArray);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: multiple === true ? idArray : idArray[0],
    }));
  };

  const renderItem = (row: any) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleItem(row)}
      >
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{row.item.name}</TextView>
          {selectedCountries.includes(row.item.code) &&
            <IconView
              name="checkmark"
              theme="clear"
              size={14}
              padding={0}
            />
          }
        </BoxView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let countries: any = await EntityManager.getCountries(); 
        setCountriesData(countries);
        setSearchResults(countries);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  useEffect(() => {
    if (formData?.[field]?.length) setSelectedCountries(formData[field]);
  }, [formData, field]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <InputTextField
        value={searchValue}
        containerStyle={styles.searchFieldContainer}
        placeholder={i18n.t('Search...')}
        onChangeText={(text: string) => triggerSearch(text)}
        rightIcon={renderSearchIcon()}
      />

      <View style={Layout.borderedListContainer}>
        {searchResults?.length > 0 &&
          <ListView
            data={searchResults}
            renderItem={(row: any) => renderItem(row)}
          />
        }
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  searchFieldContainer: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
  listItem: {
    padding: Layout.space.base / 1.2,
  }
});

export default CountriesList;
