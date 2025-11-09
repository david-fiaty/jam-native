import { TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from "../view/IconView";
import TagView from '../view/TagView';
import InputTextField from './InputTextField';
import FormManager from '@/manager/FormManager';
import ModalManager from '@/manager/ModalManager';
import BoxView from '../view/BoxView';
import ContentManager from '@/manager/ContentManager';

type Props = {
  resource: string;
  fieldKey: string;
  parentKey: string;
  rules?: any
  value?: any;
  label?: any;
  placeholder?: any;
};

const WeekDaysField = ({ resource, fieldKey, parentKey, rules, value, label, placeholder }: Props) => {
  const listData: any[] = ContentManager.getWeekDays();

  const onPress = () => {
    ModalManager.toggleModal('WeekDaysList', {
      resource: resource,
      fieldKey: fieldKey,
      parentKey: parentKey,
      rules: rules,
    });
  };

  const deleteItem = (item: any) => {
    let selectedIds: any[] = [...(value || []).filter((n: number) => n !== item.id)];
    FormManager.updateField(resource, fieldKey, selectedIds, rules, parentKey);
  };

  return (
    <>
      {FormManager.renderLabel(label, rules)}
      
      {!value?.length && (
        <TouchableOpacity
          onPress={onPress}
        >
          <InputTextField
            value={value}
            readOnly={true}
            placeholder={placeholder}
            rightIcon={<IconView name="down" theme="transparent" />}
          />
        </TouchableOpacity>
      )}

      {value?.length > 0 && (
        <BoxView 
          direction="row" 
          align="center" 
          style={Layout.fieldSelectionPreview}
        >
          {value.map((id: any) => {
            let item: any = listData.find((o: any) => o.id === id);

            return (
              <TagView
                theme="white"
                key={item.id}
                canEdit={true}
                onDeleteButtonPress={() => deleteItem(item)}
              >
                {item?.name}
              </TagView>
            );
          })}

          <IconView name="plus" theme="transparent" onPress={onPress} />
        </BoxView>
      )}

      {FormManager.renderError(fieldKey, parentKey)}
    </>
  );
};

export default WeekDaysField;
