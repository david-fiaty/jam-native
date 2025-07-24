import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import IconView from '../view/IconView';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
};

const SubSectorsField = ({ resource, field, value, placeholder }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [selectedSectors, setSeletedSectors] = useState<any[]>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (selectedIds: any[]) => {
    setSeletedSectors(selectedIds);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));
  };

  const getSectorsData = async () => {
    let data: any[] = await EntityManager.getSectors();

    return data.map((o: any) => {
      return {
        value: o?.id,
        label: o?.name,
      }
    });
  };

  const getSelectedSectors = () => {
    return formData?.[field] || [];
  };

  /*
  const getSectorsData = () => {
    let data: any[] = [];

    (formData?.[field] || []).map((id: any) => {
      let sector: any = sectorsData.find((o: any) => o.id == id);
      (sector?.sub_sectors || []).map((o: any) => {
        data.push({
          value: o?.id,
          label: o?.name,
        });
      });
    });

    return data;
  };
*/

  const deleteItem = (item: any, deleteCallback: any) => {
    let selectedIds: any[] = [...selectedSectors];
    selectedIds = selectedIds.filter((id: any) => id != item?.value);

    deleteCallback(item);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await getSectorsData());
        setSeletedSectors(getSelectedSectors());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  return (
    <BoxView direction="column" align="left">
      <MultiSelect
        value={selectedSectors}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        inside={selectedSectors.length > 0}
        style={!selectedSectors.length ? styles.element : styles.preview}
        iconStyle={selectedSectors.length > 0 ? styles.iconRight : {}}
        placeholderStyle={styles.placeholderStyle}
        iconColor={Layout.colors.primary}
        onChange={(selectedIds: any) => updateSelection(selectedIds)}
        data={sectorsData}
        renderItem={(o: any) => {
          let isSelected: boolean = selectedSectors.includes(o?.value);

          return (
            <BoxView direction="row" align="center" justify="space-between" style={styles.listItem}>
              <TextView style={isSelected ? styles.selectedItem : {}}>{o?.label}</TextView>
              { isSelected && (
                <IconView 
                  name="checkmark" 
                  theme="clear" 
                  size={13} 
                  padding={0} 
                />
              )}
            </BoxView>
          );
        }}
        renderSelectedItem={(o, unSelect) => {
          return (
            <TagView
              key={o?.value}
              theme="white"
              canEdit={true}
              containerStyle={styles.tagItem}
              onDeleteButtonPress={() => deleteItem(o, unSelect)}
            >
              {o?.label}
            </TagView>
          );
        }}
      />
    </BoxView>
  );
};

export default SubSectorsField;

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
  listItem: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base * 1.35,
    backgroundColor: Layout.colors.white,
  },
  placeholderStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  tagItem: {
    marginRight: Layout.space.base,
    marginBottom: Layout.space.base,
  },
  selectedItem: {
    fontWeight: 'bold',
  },
  iconRight: {
    alignSelf: 'flex-start',
  },
});