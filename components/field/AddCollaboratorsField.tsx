
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import CheckboxSelectBase from '../base/CheckboxSelectBase';
import i18n from '@/translation/i18n';
import ApiClient from '@/classes/ApiClient';

const AddCollaboratorsField = () => {  
  const data = ApiClient.get('jammers');

  return (
    <CheckboxSelectBase 
      label={i18n.t('Add collaborators')} 
      data={data}
    />
  );
}

const styles = StyleSheet.create({
/*

  container: {
    flexDirection: 'column',
    gap: Layout.space.small,
  },
  square: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: Layout.space.base,
    borderWidth: 1,
    borderRadius: Layout.radius.round,
    borderColor: Colors.secondary,
    width: Layout.space.base*7,
    height: Layout.space.base*7,
  },
  selected: {
    borderColor: Colors.primary,
  },
  */

});

export default AddCollaboratorsField;