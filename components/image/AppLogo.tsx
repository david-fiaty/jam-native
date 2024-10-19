import { StaticImage } from '@/components/base/StaticImage';

type Props = {
  width?: string | number,
  height?: string | number,
};

const source = require('@/assets/images/jam-logo.jpg'); 

export default ({width, height}: Props) => {
  return (
    <StaticImage source={source} width={width} height={height} />   
  );
};


