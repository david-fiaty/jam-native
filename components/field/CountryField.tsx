import { useState } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import EntityManager from "@/manager/EntityManager";

type Props = BaseProps & {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const CountryField = ({value, onChangeValue}: Props) => {
  const [countriesData, setCountriesData] = useState<any>([]);

  if (!countriesData?.length) {
    EntityManager.getCountries().then((data: any) => {
      setCountriesData(data);
    });
  }

  const buildOptions = (optionsData: any) => {
    return optionsData?.map((item: any) => {
      return {
        value: item?.code?.toLowerCase(),
        label: item?.name,
      }
    });
  };

  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(countriesData)} 
        placeholder={i18n.t('Country')} 
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

export default CountryField;