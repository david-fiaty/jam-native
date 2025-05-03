import { StyleSheet, View } from 'react-native';
import TextView from './TextView';
import { Colors } from '@/constants/Colors';
import BoxView from './BoxView';

type Props = {
  data?: any;
};

const bulletSize: number = 5.5;

const BulletListView = ({ data }: Props) => {
  return (
    <View>
      {data.map((row: any) => (
        <BoxView direction="row" align="center" justify="fleex-start">
          <View style={styles.bullet}></View>
          <TextView>{row}</TextView>
        </BoxView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    borderRadius: bulletSize,
    backgroundColor: Colors.primary,
  },
});

export default BulletListView;
