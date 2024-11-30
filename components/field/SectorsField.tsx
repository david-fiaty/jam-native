import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { BaseProps } from "@/constants/Types";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  label?: any,
  onPressEvent?: () => void;
};

const SectorsField = ({label, onPressEvent}: Props) => {
  const jamData = useSelector((state: any) => state.addJam);
  const selectedProfiles = jamData?.collaborators_ids || [];

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
