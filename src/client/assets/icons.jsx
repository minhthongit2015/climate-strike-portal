import React from 'react';

export const AICloudSrc = '/images/ai-cloud.png';
export const MyGardenSrc = '/images/my-garden.png';
export const SmileCitySrc = '/images/smile-city.png';
export const ShoppingCartSrc = '/images/shopping-cart.svg';
export const PlantPot1Src = '/images/plant.svg';
export const FarmSrc = '/images/agriculture.svg';
export const GardenToolsSrc = '/images/trowel.svg';
export const GardenOwnerSrc = '/images/bonsai.svg';

export const AICloudIcon = props => <img src={AICloudSrc} alt="AI Cloud" draggable={false} {...props} />;
export const MyGardenIcon = props => <img src={MyGardenSrc} alt="My Garden" draggable={false} {...props} />;
export const SmileCityIcon = props => <img src={SmileCitySrc} alt="Smile City" draggable={false} {...props} />;

export { default as IconPlanetEarth } from './icons/IconPlanetEarth';
export { default as IconEarthPicture } from './icons/IconEarthPicture';
export { default as IconEarthPictureStatic } from './icons/IconEarthPictureStatic';
export { default as IconWhatYouCanDo } from './icons/IconWhatYouCanDo';
export { default as IconYourQuestion } from './icons/IconYourQuestion';

export default {
  AICloudIcon,
  MyGardenIcon,
  SmileCityIcon,
  ShoppingCartSrc,
  PlantPot1Src,
  FarmSrc,
  GardenToolsSrc,
  GardenOwnerSrc
};
