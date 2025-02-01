import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from 'react-native';
import UserManager from '@/manager/UserManager';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  name?: any;
  backTitle?: any;
  entityId?: any;
  visible?: boolean;
  login?: boolean;
  trigger?: any;
  triggerAlign?: string;
  onTriggerPress?: (active: boolean) => void;
};

const ModalButton = ({ name, backTitle, entityId, login, trigger, triggerAlign, onTriggerPress }: Props) => {
  const router = useRouter();
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const triggerStyle: any = {
    alignSelf: triggerAlign || 'center',
  }

  const toggleModal = (isActive: boolean) => {
    if (login && !isLoggedIn) {
      router.push("/login");
    }
    else {
      ScreenManager.toggleModal(name, getModalParams());
      if (onTriggerPress) onTriggerPress(isActive);
    }
  };

  const getModalParams = () => {
    return { 
      backTitle: backTitle,
      entityId: entityId,
    };
  };
  
  return (  
    <TouchableOpacity
      onPress={() => toggleModal(true)}
      style={[styles.triggerButton, triggerStyle]}
    >
      {trigger}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    alignSelf: 'flex-start',
  },
});

export default ModalButton;