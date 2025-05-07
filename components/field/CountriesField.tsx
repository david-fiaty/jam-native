import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import SpinnerView from '../view/SpinnerView';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress?: () => void;
};

const CountriesField = ({ resource, field, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];
    selectedIds = selectedIds.filter((n: number) => n !== item.id);

    setCurrentValue(selectedIds);
    
    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));
  };

  useEffect(() => {
    (async () => {
      if (formData?.[field]?.length) {
        setCurrentValue(await EntityManager.getProfiles({ items_ids: formData[field] }));
      }

      if (!isLoaded) {
        setCountriesData(await EntityManager.getCountries());
        setIsLoaded(true);
      }
    })();    
  }, [isLoaded, value, formData, field]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <>
      { !currentValue?.length && (
        <TouchableOpacity
          onPress={onPress}
        >
          <InputTextField
            value={value}
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="plus" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {currentValue?.length > 0 && (
        <View style={Layout.fieldSelectionPreview}> 
          { currentValue.map((item: any) => {
            return (
              <TagView
                theme="white"
                key={item.id}
                canEdit={true}
                onDeleteButtonPress={() => deleteItem(item)}  
              >
                {item?.name}
              </TagView>
            );
          })}

          <IconView name="plus" theme="transparent" onPress={onPress} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CountriesField;
