import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import ProjectViewField from "../field/ProjectViewField";
import ProjectJamsField from "../field/ProjectJamsField";
import SectionManager from "@/manager/SectionManager";
import SectorsViewField from "../field/SectorsViewField";
import SubSectorsViewField from "../field/SubSectorsViewField";
import ModalManager from "@/manager/ModalManager";

type Props = {
  projectId?: any;
  itemData?: any;
  isPublic?: boolean;
};

const ProjectView = ({ projectId, itemData, isPublic }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<any>(null);

  const renderProjectJams = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({ projectData?.jams?.length || 0 })
          </TextView>

          {isPublic && (
            <TouchableOpacity onPress={() => {
              ModalManager.toggleModal(isPublic ? 'PublicJamSection' : 'PrivateJamSection', {
                idArray: projectData?.jams || [],
                title: i18n.t('Project Jams'),
              });
            }}>
              <TextView underline={true}>{i18n.t("View all")}</TextView>
            </TouchableOpacity>
          )}
        </BoxView>

        <ProjectJamsField
          idArray={projectData?.jams || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={isPublic}
          addable={false}
          deletable={false}
        />
      </>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectData(itemData || await EntityManager.findProject(projectId));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, projectId, itemData]);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={styles.container}
    >
      <ProjectViewField label={i18n.t('Name')}>
        <TextView>{projectData?.name || i18n.t('Unavailable')}</TextView>
      </ProjectViewField>

      <ProjectViewField label={i18n.t('Description')}>
        <TextView>{projectData?.description || i18n.t('Unavailable')}</TextView>
      </ProjectViewField>

      <ProjectViewField label={i18n.t('Industries')}>
        <SectorsViewField idArray={projectData?.sectors || []} />
      </ProjectViewField>

      <ProjectViewField label={i18n.t('Sub-industries')}>
        <SubSectorsViewField idArray={projectData?.sectors || []} />
      </ProjectViewField>

      {renderProjectJams()}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
