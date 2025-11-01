import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setFormData } from '@/redux/slices/FormSlice';
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  formData?: any;

  field: string;
  value?: any;
  placeholder?: any;
};

const ProfessionsField = ({   
  resource,
  fieldKey,
  parentKey,
  rules,
  formData, 
  field, 
  value, 
  placeholder 
}: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [itemsOptions, setItemsOptions] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const updateSelection = (selectedIds: any[]) => {
    selectedIds = [...new Set([...(formData?.[field] || []), ...selectedIds])];
    
    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  };

  const getProfessionsOptions = (professionsList: any[]) => {
    let listOptions: any[] = professionsList.map((o: any) => {
      return {
        value: o?.id,
        label: o?.name,
      }
    });

    return listOptions;
  };

  const getSubProfessionsOptions = () => {
    let listOptions: any[] = [];

    if (!Array.isArray(formData?.[field]) || !formData?.[field]?.length) {
      return listOptions;
    }

    itemsData
      .filter((o: any) => formData[field].includes(o.id))
      .map((x: any) => {
      (x?.sub_professions || []).map((y: any) => {
        listOptions.push({
          value: y?.id,
          label: y?.name,
        });
      });
    });

    return listOptions;
  };

  const getSelectedOptions = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = itemsOptions.map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const getSelectedSubOptions = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = getSubProfessionsOptions().map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const deleteItem = (item: any, deleteCallback: any) => {
    let selectedIds: any[] = formData?.[field] || [];
    selectedIds = selectedIds.filter((id: any) => id != item?.value);

    deleteCallback(item);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  };

  const renderItem = (item: any) => {
    let isSelected: boolean = (formData?.[field] || []).includes(item?.value);

    return (
      <BoxView direction="row" align="center" justify="space-between" style={styles.listItem}>
        <TextView style={isSelected ? styles.selectedItem : {}}>{item?.label}</TextView>
        {isSelected && (
          <IconView
            name="checkmark"
            theme="clear"
            size={13}
            padding={0}
          />
        )}
      </BoxView>
    );
  };

  const renderSelectedItem = (item: any, deleteCallback: any) => {
    return (
      <TagView
        key={item?.value}
        theme="white"
        canEdit={true}
        containerStyle={styles.tagItem}
        onDeleteButtonPress={() => deleteItem(item, deleteCallback)}
      >
        {item?.label}
      </TagView>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setItemsData(appState.professionsData);
        setProfessionsOptions(getProfessionsOptions(appState.professionsData));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, appState]);

  return (
    <>
      <BoxView direction="column" align="left">
        <TextView>{i18n.t('Professions')}*</TextView>
        <MultiSelect
          value={getSelectedOptions()}
          labelField="label"
          valueField="value"
          placeholder={i18n.t('Select your professions')}
          inside={getSelectedOptions().length > 0}
          style={!getSelectedOptions().length ? styles.element : styles.preview}
          iconStyle={getSelectedOptions().length > 0 ? styles.iconRight : {}}
          placeholderStyle={styles.placeholderStyle}
          iconColor={Layout.colors.primary}
          onChange={(selectedIds: any) => updateSelection(selectedIds)}
          data={itemsOptions}
          renderItem={(o: any) => renderItem(o)}
          renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
        />
        {FormManager.renderError('professions_ids')}
      </BoxView>

      {formData?.[field]?.length > 0 && (
        <BoxView direction="column" align="left">
          <TextView>{i18n.t('Sub professions')}*</TextView>
          <MultiSelect
            labelField="label"
            valueField="value"
            placeholderStyle={styles.placeholderStyle}
            iconColor={Layout.colors.primary}
            placeholder={i18n.t('Select your sub professions')}
            value={getSelectedSubOptions()}
            inside={getSelectedSubOptions().length > 0}
            style={!getSelectedSubOptions().length ? styles.element : styles.preview}
            iconStyle={getSelectedSubOptions().length > 0 ? styles.iconRight : {}}
            data={getSubProfessionsOptions()}
            renderItem={(o: any) => renderItem(o)}
            renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
            onChange={(selectedIds: any) => updateSelection(selectedIds)}
          />
          {FormManager.renderError('professions_ids')}
        </BoxView>
      )}
    </>
  );
};

export default ProfessionsField;

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
  listItem: {
    paddingHorizontal: Layout.space.base,
    paddingVertical: Layout.space.base * 1.35,
    backgroundColor: Layout.colors.white,
  },
  placeholderStyle: {
    color: Layout.colors.primary,
    fontSize: Layout.fontSize.base,
  },
  tagItem: {
    marginRight: Layout.space.base,
    marginBottom: Layout.space.base,
  },
  selectedItem: {
    fontWeight: 'bold',
  },
  iconRight: {
    alignSelf: 'flex-start',
  },
});