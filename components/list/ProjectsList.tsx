import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import ProjectJamsList from "../list/ProjectJamsList";
import SectorsTagsView from "../view/SectorsTagsView";

type Props = {
  projectId: any;
};

const ProjectsList = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getProjects([projectId]))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, projectId]);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={styles.container}
    >
      <TextView style={styles.sectionTitle}>{i18n.t('Name')}</TextView>
      <TextView>{projectItem?.name}</TextView>
    
      <TextView style={styles.sectionTitle}>{i18n.t('Description')}</TextView>
      <TextView>{projectItem?.description}</TextView>

      <TextView style={styles.sectionTitle}>{i18n.t('Jams')} ({projectItem?.jams?.length || 0})</TextView>
      <ProjectJamsList 
        resource="project"
        idArray={projectItem?.jams}

        // Todo - Implement project events
        /*
        onAddButtonPress={() => ScreenManager.toggleModal("SelectJamsForm", {
          resource: resource,
          profileId: formData?.id,
          profileJams: profileJams,
        })}
        onDeleteButtonPress={(row: any) => {
          let selectedIds: any = [...formData?.jams_ids];
          let index: number = selectedIds.findIndex((id: any) => id == row?.item?.id);
          selectedIds.splice(index, 1);
          updateField("jams_ids", selectedIds);
        }}
          */
      />

      <TextView style={styles.sectionTitle}>{i18n.t('Sectors')}</TextView>
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
    paddingBottom: Layout.space.base*3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: Layout.space.base/1.5,
  },
  projectTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  projectDescription: {
    width: '100%',
    marginTop: Layout.space.base/1.5,
  },
  projectSectors: {
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default ProjectsList;
