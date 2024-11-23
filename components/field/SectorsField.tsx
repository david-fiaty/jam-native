import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import Data from '@/constants/StaticData';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  value?: any,
};

const SectorsField = ({value}: Props) => {
  const mainIndustries = Data.mainIndustries;
  const subIndustries = Data.subIndustries;

  EntityManager.getSectors().then((data: any) => {
    console.log(data);
  });

  return (
    <BoxView direction="column" align="center" style={styles.container}>
      <SelectListBase data={mainIndustries} placeholder={i18n.t('Industries')} />
      <SelectListBase data={subIndustries} placeholder={i18n.t('Sub industries')} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SectorsField;