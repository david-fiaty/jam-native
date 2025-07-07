import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import BoxView from '../view/BoxView';
import SelectListBase from '../base/SelectListBase';
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import i18n from "@/translation/i18n";

type Props = {
  value?: any,
  onChangeValue?: (option: any) => void,
};

const CountryField = ({value, onChangeValue}: Props) => {
  const [countriesData, setCountriesData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const buildOptions = (optionsData: any) => {
    return (optionsData || []).map((item: any) => {
      return {
        value: item?.code?.toLowerCase(),
        label: item?.name,
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setCountriesData(await EntityManager.getCountries());
      }
    })();

    setIsLoaded(true);
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView size="small" />

  return (
    <BoxView direction="row" align="space-between" style={styles.container}>
      <SelectListBase 
        value={value}
        data={buildOptions(countriesData)} 
        onChangeValue={onChangeValue}
        placeholder={i18n.t('Select a country')}
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