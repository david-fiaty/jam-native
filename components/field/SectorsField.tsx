import { StyleSheet } from 'react-native';
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  label?: any;
  selectedIds?: any;
  onPressEvent?: () => void;
};

const SectorsField = ({ label, selectedIds, onPressEvent }: Props) => {
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
