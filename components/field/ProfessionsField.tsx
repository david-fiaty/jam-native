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
  //formData?: any;

  field: string;
  value?: any;
  placeholder?: any;
};

const ProfessionsField = ({   
  resource,
  fieldKey,
  parentKey,
  rules,
  //formData, 
  field, 
  value, 
  placeholder 
}: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [professionsData, setProfessionsData] = useState<any[]>([]);
  const [professionsOptions, setProfessionsOptions] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);
  const formData: any = useSelector((state: any) => state.form[resource]);

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

    professionsData
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

  const getSelectedProfessions = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = professionsOptions.map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const getSelectedSubProfessions = () => {
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
        setProfessionsData(appState.professionsData);
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
          value={getSelectedProfessions()}
          labelField="label"
          valueField="value"
          placeholder={i18n.t('Select your professions')}
          inside={getSelectedProfessions().length > 0}
          style={!getSelectedProfessions().length ? styles.element : styles.preview}
          iconStyle={getSelectedProfessions().length > 0 ? styles.iconRight : {}}
          placeholderStyle={styles.placeholderStyle}
          iconColor={Layout.colors.primary}
          onChange={(selectedIds: any) => updateSelection(selectedIds)}
          data={professionsOptions}
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
            value={getSelectedSubProfessions()}
            inside={getSelectedSubProfessions().length > 0}
            style={!getSelectedSubProfessions().length ? styles.element : styles.preview}
            iconStyle={getSelectedSubProfessions().length > 0 ? styles.iconRight : {}}
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