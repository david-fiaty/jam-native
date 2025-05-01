import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";
import BoxView from "./BoxView";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import DividerView from "./DividerView";
import ProjectJamsList from "../list/ProjectJamsList";

type Props = BaseProps & {
  projectId: any;
};

const ProjectItemView = ({ projectId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getProjects({ items_ids: [projectId] }))?.[0]);
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
      <BoxView direction="column" align="flex-start" justify="flex-start" style={styles.projectDescription}>
        <TextView style={styles.projectTitle}>{projectItem?.name}</TextView>
        <TextView>{projectItem?.description}</TextView>
      </BoxView>

      <DividerView />

      <TextView style={styles.sectionTitle}>{i18n.t('Project Jams')}</TextView>
      <ProjectJamsList 
        resource="project"
        selectedIds={projectItem?.jams}

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
});

export default ProjectItemView;
