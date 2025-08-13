import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { StyleSheet } from "react-native";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";

type Props = {

};

const SearchFiltersForm = ({ }: Props) => {
  const appState = useSelector((state: any) => state.app);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [sectorsData, setSectorsData] = useState<any[]>([]);

  const renderCountriesFilter = () => {
    return countriesData.map((o: any) => {
      return (
        <TextView key={o.id}>{o.name}</TextView>
      );
    });
  };  

  const renderSectorsFilter = () => {
    return <></>
  };  

  const renderSubSectorsFilter = () => {
    return <></>
  };  

  useEffect(() => {
    setCountriesData(appState.countriesData);
    setSectorsData(appState.sectorsData);
  }, [appState]);
  
  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderCountriesFilter()}
        </BoxView>

        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderSectorsFilter()}
        </BoxView>

        <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.countriesFilter}>
          {renderSubSectorsFilter()}
        </BoxView>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
  countriesFilter: {
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default SearchFiltersForm;
