import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';

type Props = BaseProps & {
  label?: any;
  selectedIds?: any;
  onPressEvent?: () => void;
};

const SectorsField = ({ label, selectedIds, onPressEvent }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <BoxView
      direction="row"
      align="center"
      onPress={onPressEvent}
      style={styles.container}
    >
      {label}      
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});


export default SectorsField;
