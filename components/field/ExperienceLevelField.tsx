import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import SelectListField from './SelectListField';

type Props = {
  label?: any;
  value?: any;
  onChangeValue?: (option: any) => void;
};

const ExperienceLevelField = ({label, value, onChangeValue}: Props) => {
  const experienceLevels: any[] = [
    {
      id: null,
      label: i18n.t('Select a level of experience'),
    },
    {
      id: 'less_than_1_year',
      label: i18n.t('Less than 1 year'),
    },
  ];

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
      <SelectListField
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