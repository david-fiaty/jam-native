import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import StaticData from '@/constants/StaticData';
import i18n from '@/translation/i18n';

type Props = BaseProps & {
  value?: any;
  disabled?: any;
  onChangeValue?: (option: any) => void;
};

const ProfileTypeField = ({value, disabled, onChangeValue}: Props) => {
  const profileTypes = StaticData.profileTypes;

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
      <SelectListBase 
        placeholder={i18n.t('Select a profile type')}
        value={value}
        data={buildOptions(profileTypes)}  
        onChangeValue={onChangeValue}
        disabled={disabled}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ProfileTypeField;