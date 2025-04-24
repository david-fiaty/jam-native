import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import SectionManager from '@/manager/SectionManager';
import { Colors } from '@/constants/Colors';

type Props = {
  currentSection: any;
};

const SectionBackButton = ({ currentSection }: Props) => {
  const router = useRouter();
  
  return (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={() => SectionManager.previousSection(router)}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />
  
      <TextView style={styles.title}>
        {currentSection.title}
      </TextView>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: Layout.space.base*1.5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default SectionBackButton;
