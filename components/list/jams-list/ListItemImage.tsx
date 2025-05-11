import { memo } from "react";
import { BaseProps } from "@/constants/Types";
import ImageSlideshow from "@/components/slideshow/ImageSlideshow";

type Props = BaseProps & {
  row?: any,
};

const ListItemImage = ({ row }: Props) => {
  return <ImageSlideshow data={row?.item.medias} />;
};

export default memo(ListItemImage);
