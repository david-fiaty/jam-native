import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
};

const SelectJamsForm = ({ resource, profileId }: Props) => {
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [profileItem, setProfileItem] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const updateSelection = (row: any) => {
    let selectedIdsList = [...selectedIds];
    let index: number = selectedIdsList.findIndex((id: any) => id == row.item.id);

    if (index === -1) selectedIdsList.push(row.item.id);
    else selectedIdsList.splice(index, 1);

    setSelectedIds(selectedIdsList);
  };


  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileItem(await UserManager.getProfileData());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  console.log(selectedIds);

  return (
    <ProfileJamsList 
      idArray={profileItem?.profile_jams?.map((o: any) => o.id)} // Todo - API should send ids, not full objects
      onListItemPress={(row: any) => updateSelection(row)} 
      //onListItemPress={(row: any) => SectionManager.push(router, 'jam-item', { jamId: row?.item?.id, title: row?.item?.title })}
    />   

  );

  /*
  const dispatch = useDispatch();
  const [profileJams, setProfileJams] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const idArray: any = activeModal?.params?.profileJams;
  const resource: string = activeModal.params.resource;
  const formData: any = useSelector((state: any) => state.form[resource]);
  const numColumns = 3;

  const findItemIndex = (row: any) => {
    return selectedIds.findIndex((id: any) => id == row.item.id);
  };

  const updateSelection = (row: any) => {
    let selectedIdsList = [...selectedIds];
    let index: number = findItemIndex(row);

    if (index === -1) selectedIdsList.push(row.item.id);
    else selectedIdsList.splice(index, 1);

    setSelectedIds(selectedIdsList);
  };

  const addSelection = () => {    
    dispatch(setFormData<any>({ 
      resource: resource,
      key: 'jams_ids', 
      value: [...(formData?.jams_ids || []), ...selectedIds], 
    }));

    ScreenManager.toggleModal("SelectJamsForm");
  };

  const getEmptyMessage = () => {    
    return (
      <View>
        <TextView>{i18n.t('No Jams available in your profile.')}</TextView>
        <TouchableOpacity 
          onPress={() => ScreenManager.toggleModal('JamForm')}
        >
          <TextView underline={true}>{i18n.t('Create a jam')}</TextView>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileJams(await EntityManager.getJams({ items_ids: idArray }))
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, activeModal, idArray]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BoxView
        align="center"
        justify="space-between"
        direction="row"
        style={styles.titleContainer}
      >
        <BackButton
          title={i18n.t("Select Jams")}
          onPress={() => ScreenManager.toggleModal("SelectJamsForm")}
        />

        {selectedIds?.length > 0 && (
          <TouchableOpacity onPress={addSelection}>
            <View>
              <TextView underline={true}>
                {i18n.t("Add selected")} ({selectedIds.length})
              </TextView>
            </View>
          </TouchableOpacity> 
        )}
      </BoxView>
      
      <ListView
        data={profileJams}
        numColumns={numColumns}
        contentContainerStyle={{ gap: Layout.space.base }}
        columnWrapperStyle={{ gap: Layout.space.base }}
        scrollEnabled={false}
        emptyMessage={getEmptyMessage}
        renderItem={(row: any) => (
          <JamListItem
            row={row}
            isAddable={true}
            onListItemPress={(row: any) => updateSelection(row)}
            isSelected={(selectedIds.findIndex((id: any) => id == row.item.id)) !== -1}
          />
        )}
      />
    </BoxView>
  );
  */
};

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
  },
});

export default SelectJamsForm;
