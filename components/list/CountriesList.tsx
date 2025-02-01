import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from "@/manager/EntityManager";

const CountriesList = () => {
  const dispatch = useDispatch();
  const [countriesData, setCountriesData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const resource: string = activeModal.params.resource;
  const fieldName: string = activeModal.params.field;
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (item: any) => {
    let selection: any[] = [...formData?.[fieldName] || []];
    let index: number = selection.findIndex((v: any) => v == item.code);

    if (index === -1) selection.push(item.code)
    else selection.splice(index, 1);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: fieldName, 
      value: selection,
    }));
  };

  const renderItem = (item: any) => {
    let isSelected: boolean = formData?.[fieldName]?.includes(item.code);

    return (
      <TouchableOpacity 
        key={item?.id}
        onPress={() => updateSelection(item)} 
      >
        <BoxView direction="row" align="center" justify="flex-start" style={styles.listItem}>
          <IconView name="arrow" theme="clear" size={10} />
          <TextView key={item?.id}>
            {item?.name}
          </TextView>
          
          {isSelected && <IconView name="checkmark" theme="clear" size={15} /> }
        </BoxView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (!countriesData) setCountriesData(await EntityManager.getCountries());
      setIsLoaded(true);
    })();
  }, [countriesData]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Add countries')}
        onPress={() => ScreenManager.toggleModal('CountriesList')}
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
  listItem: {
    marginLeft: 0,
    paddingVertical: Layout.space.base,
  },
});

export default CountriesList;
