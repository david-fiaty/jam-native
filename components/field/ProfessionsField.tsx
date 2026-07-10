import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from "react-redux";
import { Layout } from '@/constants/Layout';
import { MultiSelect } from 'react-native-element-dropdown';
import TagView from '../view/TagView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  listLabel?: any;
  listPlaceholder?: any;
  subListLabel?: any;
  subListPlaceholder?: any;
  childrenKey?: any;
};

const ProfessionsField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  listLabel,
  listPlaceholder,
  subListLabel,
  subListPlaceholder,
  childrenKey,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [listOptions, setListOptions] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);
  const listData: any[] = appState.professionsData;
  
  const updateSelection = (selectedIds: any[]) => {
    selectedIds = [...new Set([...(value || []), ...selectedIds])];
    FormManager.updateField(resource, fieldKey, selectedIds, rules, parentKey);
  };

  const deleteItem = (item: any, deleteCallback: any) => {
    let selectedIds: any[] = (value || []).filter((id: any) => id != item.value);
    deleteCallback(item);
    FormManager.updateField(resource, fieldKey, selectedIds, rules, parentKey);
  };

  const getListOptions = () => {
    let listOptions: any[] = (listData || []).map((o: any) => {
      return {
        value: o?.id,
        label: o?.name,
      }
    });

    return listOptions;
  };

  const getSubListOptions = () => {
    let listOptions: any[] = [];

    if (!Array.isArray(value) || !value?.length) {
      return listOptions;
    }

    listData
      .filter((o: any) => (value || []).includes(o.id))
      .map((x: any) => {
        (x?.[childrenKey] || []).map((y: any) => {
          listOptions.push({
            value: y?.id,
            label: y?.name,
          });
        });
      });

    return listOptions;
  };

  const getSelectedOptions = () => {
    let selectedIds: any[] = value || [];
    let optionsIds: any[] = listOptions.map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const getSelectedSubOptions = () => {
    let selectedIds: any[] = value || [];
    let optionsIds: any[] = getSubListOptions().map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const renderItem = (item: any) => {
    let isSelected: boolean = (value || []).includes(item?.value);

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
        setListOptions(getListOptions());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, appState]);

  return (
    <>
      <BoxView direction="column" align="left">
        {FormManager.renderLabel(listLabel, rules)}

        <MultiSelect
          value={getSelectedOptions()}
          labelField="label"
          valueField="value"
          placeholder={listPlaceholder}
          inside={getSelectedOptions().length > 0}
          style={!getSelectedOptions().length ? styles.element : styles.preview}
          iconStyle={getSelectedOptions().length > 0 ? styles.iconRight : {}}
          placeholderStyle={styles.placeholderStyle}
          iconColor={Layout.colors.primary}
          onChange={(selectedIds: any) => updateSelection(selectedIds)}
          data={listOptions}
          renderItem={(o: any) => renderItem(o)}
          renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
        />
        {FormManager.renderError(fieldKey, parentKey)}
      </BoxView>

      {value?.length > 0 && (
        <BoxView direction="column" align="left">
          {FormManager.renderLabel(subListLabel, rules)}

          <MultiSelect
            labelField="label"
            valueField="value"
            placeholderStyle={styles.placeholderStyle}
            iconColor={Layout.colors.primary}
            placeholder={subListPlaceholder}
            value={getSelectedSubOptions()}
            inside={getSelectedSubOptions().length > 0}
            style={!getSelectedSubOptions().length ? styles.element : styles.preview}
            iconStyle={getSelectedSubOptions().length > 0 ? styles.iconRight : {}}
            data={getSubListOptions()}
            renderItem={(o: any) => renderItem(o)}
            renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
            onChange={(selectedIds: any) => updateSelection(selectedIds)}
          />
          {FormManager.renderError(fieldKey, parentKey)}
        </BoxView>
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

export default ProfessionsField;