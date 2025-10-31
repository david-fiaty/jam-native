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
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
};

const WeekdaysField = ({ resource, field, value, placeholder }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [weekdaysData, setWeekdaysData] = useState<any[]>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const getWeekdaysOptions = () => {
    return [
      {
        value: 'monday',
        label: i18n.t('Monday'),
      },
      {
        value: 'tuesday',
        label: i18n.t('Tuesday'),
      },
      {
        value: 'wednesday',
        label: i18n.t('Wednesday'),
      },
      {
        value: 'thrusday',
        label: i18n.t('Thursday'),
      },
      {
        value: 'friday',
        label: i18n.t('Friday'),
      },
      {
        value: 'saturday',
        label: i18n.t('Saturday'),
      },
      {
        value: 'sunday',
        label: i18n.t('Sunday'),
      },
    ];
  };

  const getSelectedItems = () => {
    let selectedIds: any[] = formData?.[field] || [];
    let optionsIds: any[] = (weekdaysData || []).map((o: any) => o.value);

    return selectedIds.filter((id: any) => optionsIds.includes(id));
  };

  const updateSelection = (selectedIds: any[]) => {
    selectedIds = [...new Set([...(formData?.[field] || []), ...selectedIds])];
    
    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: selectedIds,
    }));
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
    if (!isLoaded) {
      setWeekdaysData(getWeekdaysOptions());
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <BoxView direction="column" align="left">
      <MultiSelect
        value={getSelectedItems()}
        labelField="label"
        valueField="value"
        placeholder={i18n.t('Select your weekdays')}
        inside={getSelectedItems().length > 0}
        style={!getSelectedItems().length ? styles.element : styles.preview}
        iconStyle={getSelectedItems().length > 0 ? styles.iconRight : {}}
        placeholderStyle={styles.placeholderStyle}
        iconColor={Layout.colors.primary}
        onChange={(selectedIds: any) => updateSelection(selectedIds)}
        data={weekdaysData}
        renderItem={(o: any) => renderItem(o)}
        renderSelectedItem={(o, unSelect) => renderSelectedItem(o, unSelect)}
      />
    </BoxView>
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

export default WeekdaysField;