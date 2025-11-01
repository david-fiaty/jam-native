import { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import InputTextField from './InputTextField';
import SpinnerView from '../view/SpinnerView';

type Props = {
  resource: string;
  fieldKey: string;
  parentKey: string;
  formData?: any;
  rules?: any
  value?: any;
  placeholder?: any;
  onPress?: () => void;
};

const OrganizationTypesField = ({ resource, fieldKey, parentKey, formData, rules, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [organizationTypes, setOrganizationTypes] = useState<any>(null);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const deleteItem = (item: any) => {
    let currentData: any = {...formData};
    let selectedIds: any[] = [...(value?.length > 0 ? value : [])];
    selectedIds = selectedIds.filter((n: number) => n !== item.id);

    setCurrentValue(selectedIds);

    dispatch(setFormData<any>({
      resource: resource,
      key: parentKey,
      value: {
        ...(currentData?.[parentKey] || {}),
        ...{ [fieldKey]: selectedIds},
      },
    }));  
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!organizationTypes) setOrganizationTypes(appState.organizationTypesData);
      setIsLoaded(true);
    }
    
    setCurrentValue(value);
  }, [isLoaded, appState]);

  if (!isLoaded) return <SpinnerView size="small" />;

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
            rightIcon={<IconView name="down" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {currentValue?.length > 0 && (
        <View style={Layout.fieldSelectionPreview}> 
          { currentValue.map((id: any) => {
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
    </>
  );
};

export default OrganizationTypesField;
