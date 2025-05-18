import { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SpinnerView from '../view/SpinnerView';
import ProjectJamsList from '../list/ProjectJamsList';
import ModalManager from '@/manager/ModalManager';
import UserManager from '@/manager/UserManager';

type Props = {
  resource: string;
  field: string;
  value?: any;
  placeholder?: any;
  onPress?: () => void;
};

const ProjectJamsField = ({ resource, field, value, placeholder, onPress }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const formData: any = useSelector((state: any) => state.form[resource]);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileData(await UserManager.getProfileData());
        setIsLoaded(true);
      }

      //setCurrentValue(getSelectedCountries());        
    })();    
  }, [isLoaded, formData, field]);

  if (!isLoaded) return <SpinnerView size="small" />;

  console.log(formData);

  return (
    <ProjectJamsList
      resource={resource}
      idArray={formData?.jams_ids}
      addButton={true}
      onAddButtonPress={() => ModalManager.toggleModal("SelectJamsForm", {
        field: 'jams_ids',
        idArray: JSON.stringify(profileData?.profile_jams || []),
        multiSelect: true,
        resource: resource,
      })}
    />
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default ProjectJamsField;
