import { useSelector } from "react-redux";
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
  const modalState: any = useSelector((state: any) => state.modal);

  const getIconTheme = (modalId: string) => {
    if (modalState.active.length > 0 && modalState.active[modalState.active.length - 1].id == modalId) {
      return 'secondary';
    }

    return 'clear';
  };

  return (
    <BoxView direction="row" align="center" justify="space-around" style={[styles.container, style]}>
      <IconView
        name="location"
        radius="round"
        size={16}
        padding={4}
        theme={getIconTheme('JamsMapView')}
        onPress={() => ModalManager.toggleModal('JamsMapView')}
      />

      <IconView
        name="plus"
        radius="round"
        size={16}
        padding={4}
        theme={getIconTheme('JamForm')}
        onPress={() => ModalManager.toggleModal('JamForm', { 
          resource: 'jam', 
        })}
      />

      <IconView
        name="search"
        radius="round"
        size={16}
        padding={4}
        theme={getIconTheme('SearchView')}
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
