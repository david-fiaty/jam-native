import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';

type Props = BaseProps & {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const JamTypeField = ({value, onChangeValue}: Props) => {
  const jamTypes = StaticData.jamTypes;

  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.label,
      }
    });
  };
  
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(jamTypes)} 
        placeholder={i18n.t('Jam type')} 
        onChangeValue={onChangeValue}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default JamTypeField;