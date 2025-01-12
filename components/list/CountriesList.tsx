import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";
import CollapsibleView from "../view/CollapsibleView";

const CountriesList = () => {
  const dispatch = useDispatch();
  const [countriesData, setCountriesData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const resource: string = activeScreen.params.resource;
  const fieldName: string = activeScreen.params.field;
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (item: any) => {
/*
    dispatch(setFormData<any>({ 
      resource: resource,
      key: fieldName, 
      value: selection.filter((o: any) => o),
    }));
  */
  };

  const renderItem = (item: any) => {
    let isSelected: boolean = formData?.[fieldName]?.includes(item.id);

    return (
      <TouchableOpacity 
        key={item?.id}
        onPress={() => updateSelection(item)} 
      >
        <BoxView direction="row" align="center" justify="space-around">
          <IconView name="arrow" theme="clear" />
          <TextView key={item?.id} style={styles.listSubItem}>
            {item?.name}
          </TextView>
          
          {isSelected && <IconView name="checkmark" theme="clear" size={14} /> }
        </BoxView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!countriesData) setCountriesData(await EntityManager.getCountries());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Add industries')}
        onPress={() => ScreenManager.toggleScreen('CountriesList')}
      />

      <View style={styles.container}>
        {countriesData?.length > 0 && (
          <ListView
            data={countriesData}
            renderItem={(row: any) => renderItem(row.item)}
          />
        )}
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  listItemCollapsible: {
    paddingHorizontal: Layout.space.base/2,
    paddingVertical: Layout.space.base/1.2,
  },
  listItemDetails: {
    gap: Layout.space.base,
  },
  listSubItem: {
    marginLeft: 0,
    paddingVertical: Layout.space.base/2.2,
  },
  itemHeader: {
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderRadius: Layout.radius.round,
  },
  itemHeaderOpened: {
    backgroundColor: Colors.secondary,
  },
});

export default CountriesList;
