import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';
import EntityManager from '@/manager/EntityManager';

type Props = {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const LocationTypeField = ({value, onChangeValue}: Props) => {
  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    });
  };
  
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(EntityManager.getLocationTypes())} 
        onChangeValue={onChangeValue}
        placeholder={i18n.t('Select a location type')}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default LocationTypeField;