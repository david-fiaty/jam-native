import { StyleSheet, View } from "react-native";
import BoxView from "@/components/view/BoxView";
import ProfileForm from "@/components/form/ProfileForm";

type Props = {
  profileId: any;
};

const ProfileFormSection = ({ profileId }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={styles.container}
      scroll={true}
    >
      <ProfileForm />
    </BoxView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

export default ProfileFormSection;