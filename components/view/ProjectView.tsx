import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
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

type Props = {
  projectId?: any;
  isPublic?: boolean;
};

const ProjectView = ({ projectId, isPublic }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<any>(null);
  const searchState = useSelector((state: any) => state.search);

  const renderProjectJams = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({projectData?.jams?.length || 0})
          </TextView>

          {isPublic && (
            <TouchableOpacity onPress={() => {
              SectionManager.push(router, 'project-jams', {
                jamId: JSON.stringify(projectData?.jams || []),
                title: i18n.t('Project Jams'),
                disableInfiniteScroll: true,
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

  const getProjectData = async () => {    
    let currentResults: any = JSON.parse(searchState.currentResults);
    let data = (currentResults.project || []).find((o: any) => o.id == projectId);

    if (!data) {
      data = (await EntityManager.getProjects([projectId]))?.[0];
    }     

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectData(await getProjectData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

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
