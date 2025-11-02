import { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import InputTextField from './InputTextField';
import SpinnerView from '../view/SpinnerView';
import FormManager from '@/manager/FormManager';
import ModalManager from '@/manager/ModalManager';

type Props = {
  resource: string;
  fieldKey: string;
  parentKey: string;
  rules?: any
  value?: any;
  placeholder?: any;
};

const OrganizationTypesField = ({ resource, fieldKey, parentKey, rules, value, placeholder }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [organizationTypes, setOrganizationTypes] = useState<any>(null);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const onPress = () => {
    ModalManager.toggleModal('OrganizationTypesList', {
      resource: resource,
      fieldKey: fieldKey,
      parentKey: parentKey,
    });
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value || []).filter((n: number) => n !== item.id)];

    if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, selectedIds, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, selectedIds, rules);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!organizationTypes) setOrganizationTypes(appState.organizationTypesData);
      setIsLoaded(true);
    }
  }, [isLoaded, appState]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <>
      {!value?.length && (
        <TouchableOpacity
          onPress={onPress}
        >
          <InputTextField
            value={value}
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="down" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {value?.length > 0 && (
        <View style={Layout.fieldSelectionPreview}>
          {value.map((id: any) => {
            let item: any = organizationTypes.find((o: any) => o.id === id);

            return (
              <TagView
                theme="white"
                key={item.id}
                canEdit={true}
                onDeleteButtonPress={() => deleteItem(item)}
              >
                {item?.name}
              </TagView>
            );
          })}

          <IconView name="plus" theme="transparent" onPress={onPress} />
        </View>
      )}

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

export default OrganizationTypesField;
