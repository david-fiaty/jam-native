import { StaticImage } from '@/components/base/StaticImage';

type Props = {
  width?: string | number,
  height?: string | number,
};

const source = require('@/assets/images/logo-1024.png'); 

export default ({width, height}: Props) => {
  return (
    <StaticImage source={source} width={width} height={height} />   
  );
};


