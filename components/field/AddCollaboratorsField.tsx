
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import CheckboxSelectBase from '../base/CheckboxSelectBase';
import i18n from '@/translation/i18n';
import ApiClient from '@/classes/ApiClient';
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

const AddCollaboratorsField = () => {  
  const data = ApiClient.get('jammers');

  return (
    <CheckboxSelectBase 
      data={data}
      label={
        <BoxView direction="row" align="center" style={styles.container}>
          <IconView name="plus" theme="secondary" size={22} radius="round" />
          <TextView>{i18n.t('Add collaborators')}</TextView>
        </BoxView>  
      } 
    />
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default AddCollaboratorsField;