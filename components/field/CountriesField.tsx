import { TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import InputTextField from './InputTextField';
import FormManager from '@/manager/FormManager';
import ModalManager from '@/manager/ModalManager';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import SelectListField from './SelectListField';

type Props = {
  resource: string;
  fieldKey: string;
  parentKey?: string;
  rules?: any;
  multiple?: boolean;
  label?: any;
  value?: any;
  placeholder?: any;
};

const CountriesField = ({ resource, fieldKey, parentKey, rules, multiple, label, value, placeholder }: Props) => {
  const appState = useSelector((state: any) => state.app, shallowEqual);
  const listData: any[] = appState.countriesData;

  const onPress = () => {
    ModalManager.toggleModal('CountriesList', {
      resource: resource,
      fieldKey: fieldKey,
      parentKey: parentKey,
      rules: rules,
    });
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value || []).filter((n: number) => n !== item.id)];
    FormManager.updateField(resource, fieldKey, selectedIds, rules, parentKey);
  };

  const onChangeValue = (item: any) => {
    let fieldValue: string = item?.value
    FormManager.updateField(resource, fieldKey, fieldValue, rules, parentKey);
  };

  const buildOptions = () => {
    return (listData || []).map((item: any) => {
      return {
        value: item?.code?.toLowerCase(),
        label: item?.name,
      }
    });
  };

  const renderSingleSelectList = () => {
    return (
      <>
        {FormManager.renderLabel(label, rules)}
        
        <BoxView direction="row" align="space-between" style={styles.container}>
          <SelectListField
            resource={resource}
            fieldKey={fieldKey}
            parentKey={parentKey}
            placeholder={placeholder}
            rules={rules}
            value={value}
            data={buildOptions()}
            onChangeValue={onChangeValue}
          />
        </BoxView>
      </>
    );
  };

  const renderMultiSelectList = () => {
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
          <BoxView
            direction="row"
            align="center"
            style={Layout.fieldSelectionPreview}
          >
            {value.map((id: any) => {
              let item: any = listData.find((o: any) => o.id === id);

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
          </BoxView>
        )}

        {FormManager.renderError(fieldKey, parentKey)}
      </>
    );
  };

  if (multiple) {
    return renderMultiSelectList();
  }
  else {
    return renderSingleSelectList();
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CountriesField;
