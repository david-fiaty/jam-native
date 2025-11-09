import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, shallowEqual } from 'react-redux';
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import FormManager from '@/manager/FormManager';
import ContentManager from '@/manager/ContentManager';

type Props = {
  resource: string;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
};

const CountryPhoneCodesList = ({ resource, fieldKey, parentKey, rules }: Props) => {
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const appState: any = useSelector((state: any) => state.app, shallowEqual);
  const listData: any[] = ContentManager.getCountryPhoneCodes();

  const toggleItem = (entityId: number) => {
    let idArray: any[] = [entityId];
    setSelectedIds(idArray);

    console.log(idArray);
    let targetCountry: any = listData.find((o: any) => o.code == idArray[0]);
    console.log(targetCountry);

    //FormManager.updateField(resource, fieldKey, idArray, rules, parentKey);
  };

  const renderItem = (row: any) => {
    let isSelected: boolean = selectedIds.includes(row.item.code);

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
      setSelectedIds(formData?.[parentKey]?.[fieldKey] || []);
      setIsLoaded(true);
    }
  }, [formData, fieldKey, parentKey, selectedIds, appState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {listData?.length > 0 &&
          <ListView
            data={listData}
            renderItem={(row: any) => renderItem(row)}
          />
        }
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
