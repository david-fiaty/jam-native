import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  multiple?: boolean;
  onPress?: () => void;
};

const CountriesField = ({ resource, field, value, placeholder, multiple, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];
    selectedIds = selectedIds.filter((n: number) => n !== item.code);

    setCurrentValue(selectedIds);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  };

  const getCurrentValue = () => {
    if (multiple === true) {
      return (formData?.[field] || []).map((v: any) => {
        return countriesData.find((item: any) => item.code === v);
      });
    }

    return formData?.[field] || '';
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let countries: any[] = await EntityManager.getCountries();
        setCountriesData(countries);
        setIsLoaded(true);
      }
    })();

    setCurrentValue(getCurrentValue());

  }, [isLoaded, formData, field]);

  if (multiple === true) {
    return (
      <>
        {!currentValue?.length && (
          <TouchableOpacity
            onPress={onPress}
            style={Layout.formField}
          >
            <InputTextField
              value={value}
              readOnly={true}
              placeholder={placeholder}
              rightIcon={<IconView name="down" theme="transparent" />}
            />
          </TouchableOpacity>
        )}

        {currentValue?.length > 0 && (
          <View style={styles.preview}>
            {currentValue.map((item: any) => {

              return item?.id && (
                <TagView
                  theme="white"
                  key={item.id}
                  canEdit={true}
                  containerStyle={styles.tagItem}
                  onDeleteButtonPress={() => deleteItem(item)}
                >
                  {item.name}
                </TagView>
              );
            })}

            <View style={styles.iconRight}>
              <IconView name="down" theme="transparent" onPress={onPress} />
            </View>
          </View>
        )}
      </>
    );
  }
  else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={Layout.formField}
      >
        <InputTextField
          readOnly={true}
          placeholder={placeholder}
          rightIcon={<IconView name="down" theme="transparent" />}
          value={countriesData.find((o: any) => o.code == value)?.name || ''}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  element: {
    ...Layout.formField,
    ...{ padding: Layout.space.base },
  },
  preview: {
    position: 'relative',
    backgroundColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
    paddingBottom: -Layout.space.base,
  },
  iconRight: {
    position: 'absolute',
    top: '50%',
    right: Layout.space.base,
  },
  tagItem: {
    marginRight: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default CountriesField;
