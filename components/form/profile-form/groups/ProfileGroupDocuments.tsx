import React from "react";
import i18n from "@/translation/i18n";
import TextView from "@/components/view/TextView";
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
        resource={resource}
        fieldKey="upload_technical_sheet"
        parentKey={parentKey}
        preview={true}
        multiple={false}
        value={formData?.[parentKey]?.upload_technical_sheet || null}
        placeholder={i18n.t('Upload a technical sheet')}
      />

      <TextView>
        {i18n.t('Other documents')}
      </TextView>
      <DocumentPickerField
        resource={resource}
        fieldKey="upload_other_docs"
        parentKey={parentKey}
        preview={true}
        multiple={true}
        value={formData?.[parentKey]?.upload_other_docs || null}
        placeholder={i18n.t('Upload other documents')}
      />
    </>
  );
}

export default ProfileGroupDocuments;