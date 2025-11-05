import { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import InputTextField from './InputTextField';
import ModalManager from '@/manager/ModalManager';
import FormManager from '@/manager/FormManager';
import BoxView from '../view/BoxView';

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
  const [currentProfiles, setCurrentProfiles] = useState<any>([]);

  const onPressEvent = () => {
    ModalManager.toggleModal('CollaboratorsList', {
      resource: resource,
      fieldKey: fieldKey,
      parentKey: parentKey,
    })
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value || [])];
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
        <BoxView
          direction="row" 
          align="center" 
          style={Layout.fieldSelectionPreview}
        >
          {currentProfiles.map((item: any) => {
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

          <IconView name="plus" theme="transparent" onPress={onPressEvent} />
        </BoxView>
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
});

export default CollaboratorsField;
