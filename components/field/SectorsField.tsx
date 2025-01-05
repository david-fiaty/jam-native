import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  slice: string;
  label?: any;
  onPressEvent?: () => void;
};

const SectorsField = ({ slice, label, onPressEvent}: Props) => {
  const jamData = useSelector((state: any) => state.jamForm);

  return (
    <BoxView
      direction="row"
      align="center"
      onPress={onPressEvent}
      style={styles.container}
    >
      <IconView name="plus" theme="secondary" radius="round" />
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
