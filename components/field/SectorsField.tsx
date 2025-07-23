import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import BoxView from '../view/BoxView';

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


  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, value, formData, field]);

  return (
    <BoxView direction="column" align="left" style={styles.container}>
      <MultiSelect
        value={selectedSectors}
        labelField="label"
        valueField="value"
        style={styles.element}
        placeholderStyle={styles.placeholderStyle}
        iconColor={Layout.colors.primary}
        onChange={(o: any) => setSeletedSectors(o)}
        data={sectorsData.map((o: any) => {
          return {
            value: o?.id,
            label: o?.name,
          }
        })}
        renderSelectedItem={(o, unSelect) => {
          return (
            <TagView
              key={o?.value}
              theme="secondary"
              canEdit={true}
              onDeleteButtonPress={() => unSelect && unSelect(o)}
            >
              {o?.label}
            </TagView>
          );
        }}
      />
    </BoxView>
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