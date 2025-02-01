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
    let selectedCodes: any[] = countriesIds || formData?.[fieldName] || [];
    let result: any[] = [];

    for (const item of countriesData) {
      if (selectedCodes.includes(item.code)) result.push(item);
    }

    return result;
  };

  const deleteItem = (item: any) => {
    let selectedCodes: any[] = [...(formData?.[fieldName] || [])];
    let index: number = selectedCodes.findIndex((v: any) => v == item.code);

    if (index !== -1) selectedCodes.splice(index, 1);

    setSelectedCountries(getSelectedCountries(selectedCodes));
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
