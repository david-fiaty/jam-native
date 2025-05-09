import JamsList from '../list/JamsList';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  jamId = JSON.parse(jamId);

  return (<JamsList idArray={jamId} />);
};

export default JamItemSection;
