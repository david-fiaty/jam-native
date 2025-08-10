import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import SectorsTagsView from "../view/SectorsTagsView";
import ProjectViewField from "../field/ProjectViewField";
import ProjectJamsField from "../field/ProjectJamsField";
import UserManager from "@/manager/UserManager";
import SectionManager from "@/manager/SectionManager";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";

type Props = {
  projectId?: any;
};

const ProjectView = ({ projectId }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);

  const renderProjectJams = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({projectItem?.jams?.length || 0})
          </TextView>

          <TouchableOpacity onPress={() => {
            SectionManager.push(router, 'project-jams', {
              jamId: JSON.stringify(projectItem?.jams || []),
              title: i18n.t('Project Jams'),
              disableInfiniteScroll: true,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProjectJamsField
          idArray={projectItem?.jams || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={false}
          addable={true}
          deletable={true}
        />
      </>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getProjects([projectId]))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, projectId]);

  console.log(projectId)

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={styles.container}
    >

      <TextView>{i18n.t('Name')} *</TextView>
        <InputTextField
          value={projectItem?.name}
          //onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['string'])}
        />
        {/*FormManager.renderError('name')*/}

        <InputTextareaField
          value={projectItem?.description}
          //onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['string'])}
        />
        {/*FormManager.renderError('description')*/}

      {renderProjectJams()}

      <TextView style={styles.groupTitle}>{i18n.t('Sectors')}</TextView>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.projectSectors}>
        <SectorsTagsView idArray={projectItem?.sectors} />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: Layout.space.base * 3,
  },
  groupTitleContainer: {
    width: '100%',
    marginTop: Layout.space.base * 1.5,
  },
  groupTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: Layout.space.base / 1.5,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  projectDescription: {
    width: '100%',
    marginTop: Layout.space.base / 1.5,
  },
  projectSectors: {
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default ProjectView;
