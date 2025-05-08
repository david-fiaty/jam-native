import { useLocalSearchParams } from "expo-router";
import JamsList from '../list/JamsList';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  const router = useLocalSearchParams();
  jamId = JSON.parse(router.jamId as string);

  return (<JamsList idArray={jamId} />);
};

export default JamItemSection;
