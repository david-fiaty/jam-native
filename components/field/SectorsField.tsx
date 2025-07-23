import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

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
        renderItem={(o: any) => (
          <BoxView direction="row">
            <TextView style={styles.listItem}>{o?.label}</TextView>
          </BoxView>
        )}
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
  listItem: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base*1.2,
  },
  placeholderStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
});