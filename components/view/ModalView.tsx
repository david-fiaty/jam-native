import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import UserManager from '@/manager/UserManager';
import ScreenManager from '@/manager/ScreenManager';
import ScreenView from './ScreenView';

type Props = {
  name?: any;
  backTitle?: any;
  visible?: boolean;
  login?: boolean;
  trigger?: any;
  triggerAlignSelf?: string;
  onTriggerPress?: (active: boolean) => void;
};

const ModalView = ({ name, backTitle, login, trigger, triggerAlignSelf, onTriggerPress }: Props) => {
  const router = useRouter();
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const triggerStyle: any = {
    alignSelf: triggerAlignSelf || 'flex-start',
  }

  const toggleModal = (isActive: boolean) => {
    if (login && !isLoggedIn) {
      router.push("/login");
    }
    else {
      ScreenManager.toggleModal(name, { backTitle: backTitle });
      if (onTriggerPress) onTriggerPress(isActive);
    }
  };
  
  return (  
    <ScreenView>
      <TouchableOpacity
        onPress={() => toggleModal(true)}
        style={[styles.triggerButton, triggerStyle]}
      >
        {trigger}
      </TouchableOpacity>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    width: '100%',
  },
  backButton: {
    marginLeft: Layout.space.base*1.5,
  },
  triggerButton: {
    alignSelf: 'flex-start',
  },
});

export default ModalView;