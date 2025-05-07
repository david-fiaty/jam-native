import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from '@/constants/Colors';
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
};

const CountriesList = ({ resource, field }: Props) => {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<any>(null);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const clearSearch = () => {
    setIsSearching(true);
    setCountriesData(countriesData);
    setIsSearching(false);
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

  const onSubmitEditing = () => {
    setIsSearching(true);
    let options = searchValue.length ? { query_text: searchValue } : {};

    return countriesData.map((o: any) => {
      return o; // Todo - Implement country search value filtering
    })
  };

  const toggleProfile = (entityId: number) => {
    let idArray = [...selectedCountries];
    if (idArray.includes(entityId)) {
      idArray = idArray.filter((value: number) => value !== entityId);
    }
    else {
      idArray.push(entityId);
    }

    setSelectedCountries(idArray);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: idArray,
    }));
  };

  const renderItem = (row: any) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => toggleProfile(row.item.id)}
      >
        <BoxView direction="row" align="center" justify="flex-start">
          <TextView>{row.item.name}</TextView>
          {selectedCountries.includes(row.item.id) &&
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
        setCountriesData(await EntityManager.getCountries());
        if (formData?.[field]?.length) {
          setSelectedCountries(formData[field]);
        }
        setIsLoaded(true);
      }
    })();
  }, [formData, field]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <InputTextField
        value={searchValue}
        containerStyle={styles.searchFieldContainer}
        placeholder={i18n.t('Search...')}
        onChangeText={(text: string) => setSearchValue(text)}
        onSubmitEditing={onSubmitEditing}
        rightIcon={renderSearchIcon()}
      />

      <View style={Layout.borderedListContainer}>
        {countriesData?.length > 0 &&
          <ListView
            data={countriesData}
            renderItem={(row: any) => renderItem(row)}
          />
        }
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  searchFieldContainer: {
    backgroundColor: Colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  listItem: {
    padding: Layout.space.base / 1.2,
  }
});

export default CountriesList;
