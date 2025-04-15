import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';

type Props = BaseProps & {
  resource: string;
  mode: string;
  item?: any;
  data?: any;
  params?: any;
  parentKey?: any;
};

const PersonalProfileForm = ({ resource, mode, item, data, params, parentKey }: Props) => {
  const dispatch = useDispatch();
  const formData: any = useSelector((state: any) => state.form[resource]);

  const fields: any = [
    {
      signup: true,
      profile: true,
      enabled: true,
      required: true,
      key: 'first_name',
      label: i18n.t('First name'),
      profileType: 'personal',
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            key={item.key}
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter your first name')}
            onChangeText={(value: string) => updateField(item, value)}
          />
        );
      },
    },
    {
      signup: true,
      profile: true,
      enabled: true,
      required: true,
      key: 'last_name',
      label: i18n.t('Last name'),
      profileType: 'personal',
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            key={item.key}
            value={data?.[parentKey]?.[item.key] || ''}
            placeholder={i18n.t('Enter your last name')}
            onChangeText={(value: string) => updateField(item, value)}
          />
        );
      },
    },
  ];

  const updateField = (item: any, value: any) => {
    dispatch(setFormData<any>({
      resource: 'profile',
      key: parentKey,
      value: {
        ...(formData[parentKey] || {}),
        ...{[item.key]: value},
      },
    }));
  };

  const renderSubField = (item: any, formData: any, params?: any) => {
    return (
      <View key={item.key}>
        <TextView style={{marginBottom: Layout.space.base / 2}}>
          {i18n.t(item.label)} {item?.required === true ? '*' : ''}
        </TextView>
        {item.render(item, formData, params)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {fields.map((field: any) => renderSubField(field, formData))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.space.base,
  },
});

export default PersonalProfileForm;