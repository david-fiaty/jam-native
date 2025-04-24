import { Layout } from '@/constants/Layout';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconView from '@/components/view/IconView';
import BoxView from '@/components/view/BoxView';
import ModalManager from '@/manager/ModalManager';

type Props = {
  style?: any;
};

const SectionFooter = ({ style }: Props) => {
  return (
    <BoxView direction="row" align="center" justify="space-around" style={[styles.container, style]}>
      <IconView
        name="location"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
        onPress={() => ModalManager.toggleModal('JamsMapView')}
      />

      <IconView
        name="plus"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
        // Todo - Add profile ID
        onPress={() => ModalManager.toggleModal('JamForm', { profileId: 'test profile ID' } )}
      />

      <IconView
        name="search"
        radius="round"
        size={16}
        padding={4}
        theme="secondary"
        onPress={() => ModalManager.toggleModal('SearchView')}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopWidth: Layout.borderWidth.base,
    borderTopColor: Colors.primary,
    padding: Layout.space.base,
  },
});

export default SectionFooter;
