import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';

type Props = {
  label?: any;
  value?: any;
  onChangeValue?: (option: any) => void;
};

const ExperienceLevelField = ({label, value, onChangeValue}: Props) => {
  const experienceLevels = StaticData.experienceLevels;

  const buildOptions = (optionsData: any) => {    
    return [...(optionsData || [])].map((item: any) => {
      return {
        value: item?.id,
        label: item?.label,
      }
    });
  };
  
  return (
    <BoxView direction="column" align="left" style={styles.container}>
      {label}
      <SelectListBase 
        placeholder={i18n.t('Select a level of experience')}
        value={value}
        data={buildOptions(experienceLevels)}  
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

export default ExperienceLevelField;