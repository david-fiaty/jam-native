import { StyleSheet } from "react-native";
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import ProjectsList from "../list/ProjectsList";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  idArray?: any;
  title?: any;
};

const ProjectScreen = ({ idArray, title }: Props) => {
  const screenTitle = title?.length ? title : i18n.t('Back');
  const activeScreen: any = ScreenManager.getActiveScreen();
  idArray = idArray?.length ? idArray : activeScreen?.params?.idArray;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={false} style={[Layout.screenContent, styles.container]}>
      <BackButton
        title={screenTitle}
        onPress={() => ScreenManager.toggleScreen('ProjectScreen')}
      />
      <BoxView style={Layout.mainContent}>
        <ProjectsList idArray={idArray} />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
});

export default ProjectScreen;