import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import ProjectJamsField from "../field/ProjectJamsField";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import SectionManager from "@/manager/SectionManager";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import SectorsField from "../field/SectorsField";

type Props = {
  projectId?: any;
};

const resource: string = 'project';

const ProjectForm = ({ projectId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const [projectItem, setProjectItem] = useState<any>(null);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateField = (key: any, value: any) => {
    dispatch(setFormData<any>({
      resource: resource,
      key: key,
      value: value,
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await EntityManager.addProject(formData);
    let message: any = {
      title: i18n.t('Create project'),
      content: i18n.t('The project was successfully created.'),
    };

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission');
    }

    ScreenManager.showMessage(message);

    setIsProcessing(false);
  };

  const renderProjectJams = () => {
    return (
      <>
        <BoxView direction="row" align="center" justify="space-between" style={styles.groupTitleContainer}>
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({formData?.jams?.length || 0})
          </TextView>

          <TouchableOpacity onPress={() => {
            SectionManager.push(router, 'project-jams', {
              jamId: JSON.stringify(formData?.jams || []),
              title: i18n.t('Project Jams'),
              disableInfiniteScroll: true,
            });
          }}>
            <TextView underline={true}>{i18n.t("View all")}</TextView>
          </TouchableOpacity>
        </BoxView>

        <ProjectJamsField
          idArray={formData?.jams || []}
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
        //setProjectItem((await EntityManager.getProjects([projectId]))?.[0]);
        let projectData: any = (await EntityManager.getProjects([projectId]))?.[0] || {};
        //FormManager.resetForm(resource); // Todo - Fix form reset on web
        setProfileId(await UserManager.getProfileId());

        dispatch(setFormData<any>({
          resource: resource,
          key: null,
          value: {
            ...projectData,
            ...{ profile_id: profileId },
          },
        }));

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
      style={[Layout.formContainer, styles.container]}
    >

      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t('Name')} *</TextView>
        <InputTextField
          value={formData?.name}
        //onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['string'])}
        />
        {/*FormManager.renderError('name')*/}

        <InputTextareaField
          value={formData?.description}
        //onChangeText={(value: string) => FormManager.updateField(resource, 'title', value, ['string'])}
        />
        {/*FormManager.renderError('description')*/}

        <SectorsField
          resource={resource}
          field="sectors_ids"
          value={formData?.sectors}
        />

        {renderProjectJams()}

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
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
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

export default ProjectForm;
