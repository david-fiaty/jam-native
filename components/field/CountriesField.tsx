import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from "react-redux";
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  resource: string;
  field: string;
  label?: any;
  onPressEvent?: () => void;
  onDeleteEvent: (item: any) => void;
};

const CountriesField = ({ resource, field, label, onPressEvent, onDeleteEvent }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<any>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const fieldName: string = field;

  const getSelectedCountries = (countriesIds?: any) => {
    let selectedIds: any[] = countriesIds || formData?.[fieldName] || [];
    let result: any[] = [];

    for (const item of countriesData) {
      if (selectedIds.includes(item.id)) {
        for (const subitem of item?.sub_sectors || []) {
          if (selectedIds.includes(subitem.id)) {
            result.push(subitem);
          }
        }
      }
    }

    return result;
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(formData?.[fieldName] || [])];
    let deleteIndex: number = selectedIds.findIndex((id: any) => id == item.id);

    if (deleteIndex !== -1) delete selectedIds[deleteIndex];
    selectedIds = selectedIds.filter(Boolean);

    let parentIds: any = countriesData.map((o: any) => o.id);
    for (const id of selectedIds) {
      if (parentIds.includes(id)) {
        let parentItem: any = countriesData.find((o: any) => o.id == id);
        let childIds: any = (parentItem?.sub_sectors || []).map((o: any) => o.id);
        let deleteItem: boolean = !selectedIds.some((v: any) => childIds.includes(v));

        if (deleteItem) {
          let index = selectedIds.findIndex((v: any) => v == id);
          delete selectedIds[index];
          selectedIds = selectedIds.filter(Boolean);
        }
      }
    }

    setSelectedCountries(getSelectedCountries(selectedIds));
    if (onDeleteEvent) onDeleteEvent(item);
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setCountriesData(await EntityManager.getCountries());
        setIsLoaded(true);
      }
      
      setSelectedCountries(getSelectedCountries());
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      <BoxView
        direction="row"
        align="center"
        onPress={onPressEvent}
        style={styles.container}
      >
        {label}      
      </BoxView>

      { selectedCountries?.length > 0 && (
        <View style={styles.preview}>
          { selectedCountries.map((item: any) => {
            return (
              <TagView
                key={item.id}
                onDeleteButtonPress={() => deleteItem(item)}  
              >
                {item?.name}
              </TagView>
            );
          }) }
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  preview: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.space.base,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default CountriesField;
