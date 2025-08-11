import { StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "@/components/view/IconView";
import JamStatusButton from "@/components/button/JamStatusButton";
import ModalManager from '@/manager/ModalManager';

type Props = {
  row?: any;
};

const maxOwnerNameLength: number = 28;

const JamViewHeader = ({ row }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const collaboratorsCount = parseInt(row?.item?.collaborators?.length);

  const renderOwnerName = () => {
    let ownerName: string = row?.item?.profile?.profile_name;

    if (ownerName.length > maxOwnerNameLength) {  
      ownerName = ownerName.substring(0, maxOwnerNameLength) + '...';
    } 

    return ownerName;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  const renderHosts = () => {
    return (
      <TouchableOpacity onPress={() => ModalManager.toggleModal('HostsList', { jamId: row?.item?.id })}>
        <TextView>
          @{renderOwnerName()}  {collaboratorsCount > 0 && `+${collaboratorsCount}`}
        </TextView>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    return <JamStatusButton active={row?.item?.is_active} />;
  };

  const renderActions = () => {
    return (
      <IconView
        name="actions"
        theme="clear"
        size={16}
        padding={0}
        onPress={() => ModalManager.toggleModal('MoreJamActionsView', { jamId: row?.item?.id })}
      />
    );
  };

  const renderComponent = () => {
    return (
      <BoxView
        direction="row"
        align="center"
        justify="space-between"
        style={styles.container}
      >
        <BoxView align="center">
          {renderHosts()}
        </BoxView>
        <BoxView align="center">
          {renderStatus()}
        </BoxView>
        <BoxView align="center">
          {renderActions()}
        </BoxView>
      </BoxView>
    );
  };

  return renderComponent();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.space.base * 1.2,
    paddingTop: Layout.space.base,
    height: Layout.space.base*3,
  },
});

export default JamViewHeader;
