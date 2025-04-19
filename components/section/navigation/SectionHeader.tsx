import BoxView from '@/components/view/BoxView';
import { Layout } from '@/constants/Layout';
import { StyleSheet, Text } from 'react-native';

const SectionHeader = () => {
  return (
    <BoxView direction="row" style={styles.container}>
      <Text>Section header</Text>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: Layout.space.base,
  },
});

export default SectionHeader;
