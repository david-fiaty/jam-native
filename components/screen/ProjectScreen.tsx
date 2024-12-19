import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import ProjectsList from "../list/ProjectsList";
import i18n from "@/translation/i18n";

type Props = BaseProps & {
  idArray?: any,
  title?: any,
};

const ProjectScreen = ({ idArray, title }: Props) => {
  const router = useRouter();
  const screenTitle = title?.length ? title : i18n.t('No title available');

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={false} style={[Layout.screenContent, styles.container]}>
      <BackButton
        title={screenTitle}
        onPress={() => router.back()}
      />
      <BoxView style={Layout.mainContent}>
        <ProjectsList idArray={idArray} showSpinner={true} />
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