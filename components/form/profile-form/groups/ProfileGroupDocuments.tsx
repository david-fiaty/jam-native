import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
import FormManager from "@/manager/FormManager";
import DocumentPickerField from "@/components/field/DocumentPickerField";
import GroupTitleView from "@/components/view/GroupTitleView";

type Props = {
  resource: any;
  formData: any;
  parentKey?: any;
};

const ProfileGroupDocuments = ({ resource, formData, parentKey }: Props) => {
  return (
    <>
      <GroupTitleView label={i18n.t("Documents")} />

      <TextView>
        {i18n.t('Technical sheet')}
      </TextView>
      <DocumentPickerField
        preview={true}
        multiple={false}
        value={formData?.profile_organization?.upload_technical_sheet || null}
        placeholder={i18n.t('Upload a technical sheet')}
        //onChangeText={(value: any) => console.log(value) }
          
        /*
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ type_of_management: value },
        }, ['string'])}

        */
      />
      {FormManager.renderError('profile_organization.upload_technical_sheet')}

      <TextView>
        {i18n.t('Other documents')}
      </TextView>
      <DocumentPickerField
        preview={true}
        multiple={true}
        value={formData?.profile_organization?.upload_other_docs || null}
        placeholder={i18n.t('Upload other documents')}
        //onChangeText={(value: any) => console.log(value) }
          
        /*
        onChangeText={(value: string) => FormManager.updateField(resource, 'profile_organization', {
          ...(formData?.profile_organization || {}),
          ...{ type_of_management: value },
        }, ['string'])}

        */
      />
      {FormManager.renderError('profile_organization.upload_other_docs')}
    </>
  );
}

export default ProfileGroupDocuments;