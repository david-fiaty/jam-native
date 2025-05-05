import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress?: () => void;
  onChangeValue: (value: any) => void;
};

const CollaboratorsField = ({ resource, field, value, placeholder, onPress, onChangeValue }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const deleteItem = (item: any) => {
    // Todo - Fix delete items

    // Selected IDs
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];

    // Delete target item
    selectedIds = selectedIds.filter((n: number) => n !== item.id);

    setCurrentValue(selectedIds);
    onChangeValue(formData?.[field]);
  };

  useEffect(() => {
    (async () => {
        if (!isLoaded) {
          if (formData?.[field]?.length) {
            setCurrentValue(await EntityManager.getProfiles({ items_ids: formData[field] }));
          }

          setIsLoaded(true);
        }

        onChangeValue(formData?.[field]);
    })();    
  }, [isLoaded, value, formData, field]);

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
        <View style={styles.preview}> 
          { currentValue.map((item: any) => {
            return (
              <TagView
                theme="white"
                key={item.id}
                canEdit={true}
                onDeleteButtonPress={() => deleteItem(item)}  
              >
                {item?.profile_name}
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
  preview: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.space.base,
    padding: Layout.space.base,
    backgroundColor: Colors.secondary,
    borderWidth: Layout.borderWidth.base, 
    borderColor: Colors.secondary, 
    borderRadius: Layout.radius.round,
    justifyContent: 'flex-start',
  },
});

export default CollaboratorsField;
