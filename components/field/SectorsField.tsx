import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import IconView from '../view/IconView';

type Props = BaseProps & {
  resource: string;
  field: string;
  label?: any;
  value?: any;
  placeholder?: any;
  onPressEvent?: () => void;
  onDeleteEvent?: (item: any) => void;
};

const SectorsField = ({ resource, field, label, value, placeholder, onPressEvent, onDeleteEvent }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const fieldName: string = field;

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

    setSelectedSectors(getSelectedSectors(selectedIds));

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

    setSelectedSectors(getSelectedSectors(value));
  }, [isLoaded, value]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <>
      {label}
      <TouchableOpacity
        onPress={onPressEvent}
      >
        <InputTextField
          value={value}
          readOnly={true}
          placeholder={placeholder}
          rightIcon={<IconView name="plus" theme="transparent" />}
        />
      </TouchableOpacity>

      { selectedSectors?.length > 0 && (
        <View style={styles.preview}>
          { selectedSectors.map((item: any) => {
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
    </>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.space.base,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default SectorsField;
