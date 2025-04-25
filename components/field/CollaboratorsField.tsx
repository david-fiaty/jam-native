import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress?: () => void;
};

const CollaboratorsField = ({ resource, field, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const deleteItem = (item: any) => {
    const selectedIds = [...formData?.[field] || []];
    const index = selectedIds.findIndex((v) => v === item.id);
    if (index !== -1) selectedIds.splice(index, 1);

    setCurrentValue(selectedIds);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));
  };

  useEffect(() => {
    (async () => {
        if (formData?.[field]?.length) setCurrentValue(await EntityManager.getProfiles({ items_ids: formData[field] }));
        setIsLoaded(true);
    })();
  }, [isLoaded, formData, field]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      <BoxView
        direction="row"
        align="center"
        onPress={onPress}
      >
        <IconView name="plus" theme="secondary" radius="round" />
        <TextView>{i18n.t('Add collaborators')}</TextView>
      </BoxView>

        { currentValue?.length > 0 && (
          <View style={styles.preview}> 
            { currentValue.map((item: any) => {
              return (
                <TagView
                  key={item.id}
                  onDeleteButtonPress={() => deleteItem(item)}  
                >
                  {item?.profile_name}
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

export default CollaboratorsField;
