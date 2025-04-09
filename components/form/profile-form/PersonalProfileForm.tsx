import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { useSelector, useDispatch } from "react-redux";
import i18n from '@/translation/i18n';
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';

type Props = BaseProps & {
  resource?: any;
  item?: any;
  data?: any;
  params?: any;
  parentKey?: any;
};

const PersonalProfileForm = ({resource, item, data, params, parentKey}: Props) => {
  const formData: any = useSelector((state: any) => state.form[resource]);

  const fields: any = [
    {
      signup: true,
      profile: true,
      enabled: true,
      required: false,
      key: 'first_name',
      label: i18n.t('First name'),
      render: (item: any, data: any, params?: any) => {
        return (
          <InputTextField
            value={data[item.key]}
            placeholder={i18n.t('Profile name')}
            onChangeText={(value: string) => {}}
          />
        );
      },
    },
  ];

  return (<TextView>personal profile fields</TextView>);
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default PersonalProfileForm;