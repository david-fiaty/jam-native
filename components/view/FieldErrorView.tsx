import { StyleSheet } from "react-native";
import TextView from "./TextView";

type Props = {
  fieldKey: any;
};

const FIeldErrorView = ({ fieldKey }: Props) => {
  return (
    <TextView style={styles.container}>
      {fieldKey}: Error message
    </TextView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
    fontSize: 12.5,
  },
});

export default FIeldErrorView;
