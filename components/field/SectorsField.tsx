import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import SpinnerView from '../view/SpinnerView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  value?: any,
};

const SectorsField = ({value}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [mainIndustries, setMainIndustries] = useState<any>([]);
  const [subIndustries, setSubIndustries] = useState<any>([]);

  if (!mainIndustries) {
    EntityManager.getSectors().then((data: any) => {
      setMainIndustries(data);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  console.log(mainIndustries);

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