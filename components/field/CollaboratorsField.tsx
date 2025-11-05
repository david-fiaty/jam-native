import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import ModalManager from '@/manager/ModalManager';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: any;
};

const CollaboratorsField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  placeholder,
}: Props) => {
  const dispatch = useDispatch();
  const [currentProfiles, setCurrentProfiles] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const onPressEvent = () => {
    ModalManager.toggleModal('CollaboratorsList', {
      resource: resource,
      field: fieldKey,
    })
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(formData?.[fieldKey]?.length > 0 ? formData[fieldKey] : [])];
    selectedIds = selectedIds.filter((n: number) => n !== item.id);

    if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, selectedIds, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, selectedIds, rules);
    }
  };

  useEffect(() => {
    (async () => {
      setCurrentProfiles(await EntityManager.getProfiles(value || []));
    })();
  }, [value]);

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
      {!currentProfiles?.length && (
        <TouchableOpacity
          onPress={onPressEvent}
        >
          <InputTextField
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="down" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {currentProfiles?.length > 0 && (
        <View style={styles.preview}>
          {currentProfiles.map((item: any) => {
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
            <IconView name="down" theme="transparent" onPress={onPressEvent} />
          </View>
        </View>
      )}

      {FormManager.renderError(fieldKey, parentKey)}
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
