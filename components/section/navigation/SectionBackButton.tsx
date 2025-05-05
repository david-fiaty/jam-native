import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import BoxView from '@/components/view/BoxView';
import IconView from '@/components/view/IconView';
import TextView from '@/components/view/TextView';
import SectionManager from '@/manager/SectionManager';

const SectionBackButton = () => {
  const router = useRouter();
  const sectionState: any = useSelector((state: any) => state.section);

  const onPress = () => {
    let activeSections: any[] = sectionState.active;

    console.log(activeSections);
    
    /*
    let activeSections: any[] = sectionState.active;
    let targetSection: any = {};


    if (activeSections.length > 1) {
      targetSection = activeSections[activeSections.length - 2];
    }
    */

    //SectionManager.back(router);
  }
  
  return (
    <BoxView
      direction="row"
      align="center"
      justify="flex-start"
      style={styles.container}
      onPress={onPress}
    >
      <IconView
        name="previous"
        theme="clear"
        padding={0}
      />
  
      <TextView style={styles.title}>
        Back
        {/*currentSection.title*/}
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
