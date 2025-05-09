import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ScreenManager from "@/manager/ScreenManager";
import ListView from "../view/ListView";
import EntityManager from "@/manager/EntityManager";
import SpinnerView from "../view/SpinnerView";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import TextView from "../view/TextView";
import JamListItem from "../list/ListItem/JamListItem";
import UserManager from "@/manager/UserManager";
import ProfileJamsList from "../list/ProfileJamsList";

type Props = {
  resource: string;
  profileId: any;
  field: string;
};

const numColumns = 3;

const SelectJamsForm = ({ resource, profileId, field }: Props) => {
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [profileItem, setProfileItem] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const toggleItem = (row: any) => {
    let idArray = [...selectedIds];
    let index: number = idArray.findIndex((id: any) => id == row.item.id);

    if (index === -1) idArray.push(row.item.id);
    else idArray.splice(index, 1);

    setSelectedIds(idArray);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: idArray,
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileItem(await UserManager.getProfileData());

        if (formData?.[field]?.length) {
          setSelectedIds(formData[field]);
        }

        setIsLoaded(true);
      }
    })();
  }, [isLoaded, field, formData]);

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={[Layout.formContainer, styles.container]}>
      <ProfileJamsList
        resource={resource}
        field="jams_ids"
        isAddable={true}
        multiSelect={true}
        idArray={[18, 20, 32, 33, 37]}
        //idArray={profileItem?.profile_jams?.map((o: any) => o.id)} // Todo - API should send ids, not full objects
        onListItemPress={(row: any) => toggleItem(row)}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: "100%",
  },
});

export default SelectJamsForm;
