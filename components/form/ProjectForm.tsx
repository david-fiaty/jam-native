import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import ProjectJamsField from "../field/ProjectJamsField";
import ScreenManager from "@/manager/ScreenManager";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import FormManager from "@/manager/FormManager";
import PrivacyStatusField from "../field/PrivacyStatusField";
import ButtonView from "../view/ButtonView";

type Props = {
  projectId?: any;
  isPublic?: boolean;
};

const resource: string = 'project';

const ProjectForm = ({ projectId, isPublic }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource], shallowEqual);
  const userState: any = useSelector((state: any) => state.user, shallowEqual);

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await EntityManager.addProject(formData);
    let message: any = {
      title: i18n.t('Create project'),
      content: i18n.t('The project was successfully created.'),
    };

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission.');
      FormManager.addServerErrors(resource, result.response);
    }
    else {
      FormManager.resetForm(resource);
    }

    ScreenManager.showMessage(message);

    setIsProcessing(false);
  };

  const loadFormData = async () => {
    let data: any = {};
    let profileId: any = userState.profileData.id;

    if (!isNaN(parseInt(projectId)) && parseInt(projectId) > 0) {
      data = (await EntityManager.getProjects([projectId]))?.[0];
      data = {
        ...data,
        ...{
          jams_ids: [...new Set([
            ...(data?.jams || []),
            ...(formData?.jams_ids || []),
          ])],
        },
      };

      delete data.jams;
    }

    dispatch(setFormData<any>({
      resource: resource,
      key: null,
      value: {
        ...data,
        ...{ profile_id: profileId },
      },
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        await loadFormData();
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
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>{i18n.t("Name")}*</TextView>
        <InputTextField
          value={formData?.name}
          onChangeText={(value: string) => FormManager.updateField(resource, 'name', value, ['string'])}
        />
        {FormManager.renderError('name')}

        <TextView>{i18n.t("Description")}*</TextView>
        <InputTextareaField
          value={formData?.description}
          onChangeText={(value: string) => FormManager.updateField(resource, 'description', value, ['string'])}
        />
        {FormManager.renderError('description')}

        <TextView>{i18n.t("Privacy status")}*</TextView>
        <PrivacyStatusField
          value={formData?.privacy_status}
          onChangeValue={(option: any) => FormManager.updateField(resource, 'privacy_status', option.value, ['string'])}
        />
        {FormManager.renderError('privacy_status')}

        <BoxView direction="row" align="center" justify="space-between">
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({formData?.jams_ids?.length || 0})
          </TextView>
        </BoxView>
        <ProjectJamsField
          idArray={formData?.jams_ids}
          emptyMessage={i18n.t('No data available.')}
          isPublic={false}
          addable={true}
          deletable={true}
        />

        <View style={styles.subtmitButton}>
          <ButtonView
            label={i18n.t("Submit")}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>
      </BoxView>
    </BoxView >
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
  subtmitButton: {
    width: '100%',
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base * 2,
  },
});

export default ProjectForm;
