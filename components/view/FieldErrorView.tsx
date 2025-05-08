import { StyleSheet } from "react-native";
import TextView from "./TextView";

type Props = {
  message: any;
};

const FIeldErrorView = ({ message }: Props) => {
  return (
    <TextView style={styles.container}>
      {message}
    </TextView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'red',
    fontSize: 13.5,
  },
});

export default FIeldErrorView;
