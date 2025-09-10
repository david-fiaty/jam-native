
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';

type Props = {

};

const MapLegendView = ({ }: Props) => {
  return (
    <TouchableOpacity
      style={styles.legend}
      onPress={() => console.log('open legend panel')}
    >
      <IconView
        name="right"
        theme="transparent"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
  legend: {
    position: 'absolute',
    bottom: Layout.space.base * 5,
    backgroundColor: Layout.colors.white,
    padding: Layout.space.base / 2,
  },
  scrollContainer: {
    width: '100%',
  },
});

export default MapLegendView;