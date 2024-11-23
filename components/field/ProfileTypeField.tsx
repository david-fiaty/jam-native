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

const ProfileTypeField = ({value, onChangeValue}: Props) => {
  const profileTypes = StaticData.profileTypes;
  
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        value={value}
        data={profileTypes} 
        placeholder={i18n.t('Profile type')} 
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

export default ProfileTypeField;