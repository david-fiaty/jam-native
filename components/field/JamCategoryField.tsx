import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import FormManager from '@/manager/FormManager';
import ListView from '../view/ListView';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import EntityManager from '@/manager/EntityManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
  value?: any;
  label?: any;
  placeholder?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const JamCategoryField = ({
  resource,
  fieldKey,
  parentKey,
  rules,
  value,
  label,
  onChangeValue
}: Props) => {
  const jamCategories: any = EntityManager.getJamTypes();
  
  const onChangeEvent = (fieldValue: any) => {
    if (onChangeValue) {
      onChangeValue(fieldValue);
    }
    else if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, fieldValue, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, fieldValue, rules);
    }
  };

  const renderJamCategory = (row: any) => (
    <TouchableOpacity onPress={() => onChangeEvent(row.item.id)}>
      <View style={styles.categoryContainer}>
        <View
          style={[
            styles.categoryItem,
            value == row.item.id ? styles.categoryItemSelected : {},
          ]}
        >
          <IconView name={row.item.icon} theme="secondary" />
        </View>
        <TextView>{row.item.name}</TextView>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {FormManager.renderLabel(label, rules)}

      <BoxView direction="column" align="left" style={styles.container}>
        <ListView
          data={jamCategories}
          numColumns={4}
          horizontal={false}
          scrollEnabled={false}
          contentContainerStyle={Layout.listContainer}
          columnWrapperStyle={Layout.listColumnWrapper}
          renderItem={(row: any) => renderJamCategory(row)}
        />

        {FormManager.renderError(fieldKey, parentKey)}
      </BoxView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  categoryContainer: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Layout.colors.secondary,
    padding: Layout.space.base,
    borderWidth: Layout.borderWidth.big,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.secondary,
    width: Layout.space.base * 7,
    height: Layout.space.base * 7,
  },
  categoryItemSelected: {
    borderColor: Layout.colors.primary,
  },
});

export default JamCategoryField;