import { StaticImage } from '../base/StaticImage';

type Props = {
  width?: string | number,
  height?: string | number,
};

const source = require('@/assets/images/jam-logo.png'); 

const JamLogo = ({width, height}: Props) => {
  return (
    <StaticImage 
      path={source} 
      width={width}
      height={height}
    />   
  );
};

export default JamLogo;

