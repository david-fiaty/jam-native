import { useState, useEffect, useRef } from 'react';
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
  onPress?: () => void;
};

const CollaboratorsField = ({ resource, field, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [currentProfiles, setCurrentProfiles] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(formData?.[field]?.length > 0 ? formData[field] : [])];
    selectedIds = selectedIds.filter((n: number) => n !== item.id);
    
    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: selectedIds, 
    }));
  };
  
  useEffect(() => {
    (async () => {
      setCurrentProfiles(await EntityManager.getProfiles(value || []));
    })();    
  }, [value]);

  return (
    <>
      { !currentProfiles?.length && (
        <TouchableOpacity
          onPress={onPress}
        >
          <InputTextField
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="plus" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {currentProfiles?.length > 0 && (
        <View style={styles.preview}> 
          { currentProfiles.map((item: any) => {
            return (
              <TagView
                theme="white"
                key={item.id}
                canEdit={true}
                onDeleteButtonPress={() => deleteItem(item)}  
                containerStyle={styles.tagItem}
              >
                {item?.profile_name}
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

export default CollaboratorsField;
