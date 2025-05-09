import JamsList from '../list/JamsList';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  return <JamsList idArray={JSON.parse(jamId)} />;
};

export default JamItemSection;
