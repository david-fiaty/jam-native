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
      justify="center"
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
  },
});

export default ProfileFormSection;