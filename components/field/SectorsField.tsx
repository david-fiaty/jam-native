import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import IconView from '../view/IconView';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress: () => void;
  onChangeValue: (value: any) => void;
};

const SectorsField = ({ resource, field, value, placeholder, onPress, onChangeValue }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [currentValue, setCurrentValue] = useState<any>([]);
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
    onChangeValue(formData?.[field]);
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setIsLoaded(true);
      }

      onChangeValue(formData?.[field]);
    })();

    setCurrentValue(getSelectedSectors(value));
  }, [isLoaded, value, formData, field]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <>
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

      { currentValue?.length > 0 && (
        <View style={styles.preview}>
          { currentValue.map((item: any) => {
            return (
              <TagView
                key={item.id}
                canEdit={true}
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
