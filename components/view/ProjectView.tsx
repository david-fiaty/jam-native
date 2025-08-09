import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import SectorsTagsView from "../view/SectorsTagsView";
import ProjectViewField from "../field/ProjectViewField";
import ProjectJamsField from "../field/ProjectJamsField";

type Props = {
  idArray?: any;
  isPublic?: boolean;
};

const ProjectView = ({ idArray, isPublic }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projectItem, setProjectItem] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProjectItem((await EntityManager.getProjects(idArray))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray]);

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={styles.container}
    >
      <ProjectViewField label={i18n.t('Name')}>
        <TextView>{projectItem?.name || i18n.t('Unavailable')}</TextView>
      </ProjectViewField>

      <ProjectViewField label={i18n.t('Description')}>
        <TextView>{projectItem?.description || i18n.t('Unavailable')}</TextView>
      </ProjectViewField>

      <TextView style={styles.sectionTitle}>{i18n.t('Jams')} ({projectItem?.jams?.length || 0})</TextView>
      <ProjectJamsField
        idArray={projectItem?.jams || []}
        emptyMessage={i18n.t('No data available.')}
        isPublic={isPublic}
        addable={true}
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
    paddingBottom: Layout.space.base * 3,
  },
  sectionTitle: {
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
