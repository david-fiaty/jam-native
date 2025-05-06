import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import ProjectsList from "../list/ProjectsList";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";

type Props = BaseProps & {
  idArray?: any;
  title?: any;
};

const ProjectScreen = ({ idArray, title }: Props) => {
  const router = useRouter();
  const screenTitle = title?.length ? title : i18n.t('Back');
  const activeModal: any = ScreenManager.getActiveModal();
  idArray = idArray?.length ? idArray : activeModal?.params?.idArray;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={false} style={[Layout.screenContent, styles.container]}>
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