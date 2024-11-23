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

  const buildOptions = (optionsData: any) => {
    return optionsData.map((item: any) => {
      return {
        value: item?.id,
        label: item?.name,
      }
    });
  };

  if (!mainIndustries?.length) {
    EntityManager.getSectors().then((data: any) => {
      setMainIndustries(buildOptions(data));
      setSubIndustries([]);
      setIsLoaded(true);
    });
  }

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView direction="column" align="center" style={styles.container}>

      <SelectListBase 
        data={mainIndustries} 
        placeholder={i18n.t('Industries')} 
        onChangeValue={(option: any) => console.log(option)}
      />

      <SelectListBase 
        data={subIndustries} 
        placeholder={i18n.t('Sub industries')} 
        onChangeValue={(option: any) => console.log(option)}
      />

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SectorsField;