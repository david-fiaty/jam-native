import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import Data from '@/constants/StaticData';

type Props = BaseProps & {
  value?: any,
};

const ProfileTypeField = ({value}: Props) => {
  const profileTypes = Data.profileTypes;
  
  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase 
        data={profileTypes} 
        placeholder={i18n.t('Profile type')} 
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