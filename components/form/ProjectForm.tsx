import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import EntityManager from "@/manager/EntityManager";
import BoxView from "../view/BoxView";
import i18n from "@/translation/i18n";
import ProjectJamsField from "../field/ProjectJamsField";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import SectorsField from "../field/SectorsField";
import FormManager from "@/manager/FormManager";
import PrivacyStatusField from "../field/PrivacyStatusField";
import DatePickerField from "../field/DatePickerField";
import DataManager from "@/manager/DataManager";
import CountriesField from "../field/CountriesField";
import ModalManager from "@/manager/ModalManager";
import ButtonView from "../view/ButtonView";

type Props = {
  projectId?: any;
  isPublic?: boolean;
};

const resource: string = 'project';

const ProjectForm = ({ projectId, isPublic }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const [projectData, setProjectData] = useState<any>({});
  const formData: any = useSelector((state: any) => state.form[resource], shallowEqual);

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

  const getProjectJamsIds = () => {
    return [...new Set([
      ...(projectData?.jams || []), 
      ...(formData?.jams_ids || [])
    ])];
  };

  const renderProjectJams = () => {
    let projectJamIds: any[] = getProjectJamsIds();

    return (
      <>
        <BoxView direction="row" align="center" justify="space-between">
          <TextView style={styles.groupTitle}>
            {i18n.t('Jams')} ({projectJamIds?.length || 0})
          </TextView>
        </BoxView>

        <ProjectJamsField
          idArray={projectJamIds}
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
        let projectData: any = {};
        setProfileId(await UserManager.getProfileId());

        if (!isNaN(parseInt(projectId)) && parseInt(projectId) > 0) {
          projectData = (await EntityManager.getProjects([projectId]))?.[0];
        }

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

        <TextView>{i18n.t('Start date')}</TextView>
        <DatePickerField
          value={formData?.period?.start_datetime}
          onChangeValue={(value: any) =>
            updateField('period', {
              ...(formData?.period || {}),
              ...{ start_datetime: DataManager.toDbDate(value) },
            })
          }
        />

        <TextView>{i18n.t('End date')}</TextView>
        <DatePickerField
          value={formData?.period?.end_datetime}
          onChangeValue={(value: any) =>
            updateField('period', {
              ...(formData?.period || {}),
              ...{ end_datetime: DataManager.toDbDate(value) },
            })
          }
        />

        <TextView>{i18n.t('Select countries')}</TextView>
        <CountriesField
          multiple={true}
          resource={resource}
          field="scope_countries_codes"
          placeholder={i18n.t('Select countries')}
          value={formData?.scope_countries_codes}
          onPress={() => ModalManager.toggleModal('CountriesList', {
            resource: resource,
            field: 'scope_countries_codes',
            multiple: true,
          })}
        />

        <SectorsField
          resource={resource}
          field="sectors_ids"
          value={formData?.sectors}
        />

        {renderProjectJams()}

        <View style={styles.subtmitButton}>
          <ButtonView
            label={i18n.t("Submit")}
            isProcessing={isProcessing}
            onPress={submitForm}
          />
        </View>
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
  subtmitButton: {
    width: '100%',
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base * 2,
  },
});

export default ProjectForm;
