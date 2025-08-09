import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const getCurrentValue = () => {
    return formData?.[field] || [];
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileData(await UserManager.getProfileData());
        setIsLoaded(true);
      }

      setCurrentValue(getCurrentValue());        
    })();    
  }, [isLoaded, formData, field]);

  return (
    <ProjectJamsList
      resource={resource}
      field={field}
      idArray={currentValue}
      addButton={true}
      isDeletable={true}
      onAddButtonPress={() => ModalManager.toggleModal("SelectJamsForm", {
        field: 'jams_ids',
        idArray: JSON.stringify(profileData?.profile_jams || []),
        multiSelect: true,
        resource: resource,
      })}
    />
  );
};

export default ProjectJamsField;
