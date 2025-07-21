import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';

type Props = {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const PrivacyStatusField = ({value, onChangeValue}: Props) => {
  const privacyStatuses: any[] = [
    {
      id: 'private',
      label: i18n.t('Private'),
    },
    {
      id: 'public',
      label: i18n.t('Public'),
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
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(privacyStatuses)} 
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

export default PrivacyStatusField;