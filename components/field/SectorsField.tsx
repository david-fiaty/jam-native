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

  const deleteItem = (item: any) => {
    // Variables
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];
    let deleteIndex: number = selectedIds.findIndex((id: any) => id == item.id);
    let parentIds: any = sectorsData.map((o: any) => o.id);

    // Delete target item
    delete selectedIds[deleteIndex];
    selectedIds = selectedIds.filter(Boolean);

    // Delete childless parents
    for (const id of selectedIds) {
      // Todo - Delete childless parents
    }
    
    setSelectedSectors(getSelectedSectors(selectedIds));

    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));

    
    //if (onDeleteEvent) onDeleteEvent(item);


    /*
    console.log('item', item);
    console.log('selected ids', selectedIds);
    console.log('delete index', deleteIndex);
    console.log('parent ids', parentIds);
    */

    /*
    for (const id of selectedIds) {
      if (parentIds.includes(id)) {
        console.log('---', id)
      }
    }
      */


    /*
    if (deleteIndex !== -1) selectedIds.splice(deleteIndex, 1);

    let parentIds: any = sectorsData.map((o: any) => o.id);
    for (const id of selectedIds) {
      if (parentIds.includes(id)) {
        let parentItem: any = sectorsData.find((o: any) => o.id == id);
        let childIds: any = (parentItem?.sub_sectors || []).map((o: any) => o.id);
        let deleteItem: boolean = !selectedIds.some((v: any) => childIds.includes(v));

        if (deleteItem) {
          let index = selectedIds.findIndex((v: any) => v == id);
          selectedIds.splice(index, 1);
        }
      }
    }

    setSelectedSectors(getSelectedSectors(selectedIds));
    if (onDeleteEvent) onDeleteEvent(item);
    */
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
        style={styles.container}
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
