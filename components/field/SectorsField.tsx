import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import ListView from '../view/ListView';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import i18n from '@/translation/i18n';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress: () => void;
};

const SectorsField = ({ resource, field, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [selectedSectors, setSeletedSectors] = useState<any[]>([]);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const [isOptionsListVisible, setIsOptionsListVisible] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const getSelectedSectors = (sectorsIds?: any) => {
    let selectedIds: any[] = sectorsIds?.length ? sectorsIds : [];
    let result: any[] = [];

    for (const item of sectorsData) {
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

  const getSubitemIds = (itemId: number) => {
    let idArray: any[] = [];
    let item: any = sectorsData.find((o: any) => o.id == itemId);

    for (const row of item?.sub_sectors || []) {
      idArray.push(row.id);
    }

    return idArray;
  };

  const deleteItem = (item: any) => {
    // Selected IDs
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];

    // Delete target item
    selectedIds = selectedIds.filter((n: number) => n !== item.id);

    // Delete childless parents
    for (const id of selectedIds) {
      let subitemIds: any[] = getSubitemIds(id);
      if (subitemIds.length > 0) {
        let hasSelectedSubitems: boolean = selectedIds.some(n => subitemIds.includes(n));
        if (!hasSelectedSubitems) {
          selectedIds = selectedIds.filter((n: number) => n !== id);
        }
      }
    }

    setCurrentValue(getSelectedSectors(selectedIds));

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setIsLoaded(true);
      }
    })();

    setCurrentValue(getSelectedSectors(value));
  }, [isLoaded, value, formData, field]);

  console.log(selectedSectors)

  return (

    <BoxView direction="column" align="left" style={styles.container}>
      <MultiSelect
        value={selectedSectors}
        labelField="label"
        valueField="value"
        style={styles.element}
        placeholderStyle={styles.placeholderStyle}
        //selectedTextStyle={styles.selectedTextStyle}
        //iconStyle={styles.iconStyle}
        //itemTextStyle={styles.itemTextStyle}
        //containerStyle={containerStyle}
        iconColor={Layout.colors.primary}
        onChange={(o: any) => setSeletedSectors(o)}
        data={sectorsData.map((o: any) => {
          return {
            value: o?.id,
            label: o?.name,
          }
        })}
      />
    </BoxView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <IconView name="down" theme="transparent" onPress={onPress} iconStyle={styles.toggle} />
      </View>

      {sectorsData?.length > 0 && (
        <View style={styles.optionsListContainer}>
          <ListView
            data={sectorsData}
            renderItem={(row: any) => (
              <TextView key={row?.item?.name}>{row?.item?.name}</TextView>
            )}
          />
        </View>
      )}
    </View>
  )

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
            rightIcon={<IconView name="plus" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {currentValue?.length > 0 && (
        <View style={[Layout.fieldSelectionPreview, styles.preview]}>
          {currentValue.map((item: any) => {
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

          <IconView name="down" theme="transparent" onPress={onPress} iconStyle={styles.toggle} />
        </View>
      )}
    </>
  );
};

export default SectorsField;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  element: {
    ...Layout.formField, 
    ...{ padding: Layout.space.base },
  },
  fieldContainer: {
    gap: Layout.space.base,
    padding: Layout.space.base,
    backgroundColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
    alignItems: 'space-between',
    flexWrap: 'wrap',
  },
  optionsListContainer: {
    position: 'relative',
  },
  preview: {
    //flexShrink: 1,
    //backgroundColor: 'red',
  },
  toggle: {
    position: 'absolute',
    right: 0,
  },
  placeholderStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  itemTextStyle: {
    padding: Layout.space.base,
  },
  selectedTextStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  iconStyle: {},
});