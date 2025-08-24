import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
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
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
};

const SectorsField = ({ resource, field, value, placeholder }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [sectorsOptions, setSectorsOptions] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (selectedIds: any[]) => {
    selectedIds = [...new Set([...(formData?.[field] || []), ...selectedIds])];
    
    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
  };

  const getSectorsOptions = (sectorsList: any[]) => {
    let listOptions: any[] = sectorsList.map((o: any) => {
      return {
        value: o?.id,
        label: o?.name,
      }
    });

    return listOptions;
  };

  const getSubSectorsOptions = () => {
    let listOptions: any[] = [];

    if (!Array.isArray(formData?.[field]) || !formData?.[field]?.length) {
      return listOptions;
    }

    sectorsData
      .filter((o: any) => formData[field].includes(o.id))
      .map((x: any) => {
      (x?.sub_sectors || []).map((y: any) => {
        listOptions.push({
          value: y?.id,
          label: y?.name,
        });
      });
    });

    return listOptions;
  };

  const getSelectedSectors = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = sectorsOptions.map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const getSelectedSubSectors = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = getSubSectorsOptions().map((o: any) => o.value);

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
        setSectorsData(appState.sectorsData);
        setSectorsOptions(getSectorsOptions(appState.sectorsData));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, appState]);

  return (
    <>
      <BoxView direction="column" align="left">
        <TextView>{i18n.t('Activity sectors')}*</TextView>
        <MultiSelect
          value={getSelectedSectors()}
          labelField="label"
          valueField="value"
          placeholder={i18n.t('Select your sectors')}
          inside={getSelectedSectors().length > 0}
          style={!getSelectedSectors().length ? styles.element : styles.preview}
          iconStyle={getSelectedSectors().length > 0 ? styles.iconRight : {}}
          placeholderStyle={styles.placeholderStyle}
          iconColor={Layout.colors.primary}
          onChange={(selectedIds: any) => updateSelection(selectedIds)}
          data={sectorsOptions}
          renderItem={(o: any) => renderItem(o)}
          renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
        />
        {FormManager.renderError('sectors_ids')}
      </BoxView>

      {formData?.[field]?.length > 0 && (
        <BoxView direction="column" align="left">
          <TextView>{i18n.t('Activity sub sectors')}*</TextView>
          <MultiSelect
            value={getSelectedSubSectors()}
            labelField="label"
            valueField="value"
            placeholder={i18n.t('Select your sub sectors')}
            inside={getSelectedSubSectors().length > 0}
            style={!getSelectedSubSectors().length ? styles.element : styles.preview}
            iconStyle={getSelectedSubSectors().length > 0 ? styles.iconRight : {}}
            placeholderStyle={styles.placeholderStyle}
            iconColor={Layout.colors.primary}
            onChange={(selectedIds: any) => updateSelection(selectedIds)}
            data={getSubSectorsOptions()}
            renderItem={(o: any) => renderItem(o)}
            renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
          />
          {FormManager.renderError('sectors_ids')}
        </BoxView>
      )}
    </>
  );
};

export default SectorsField;

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