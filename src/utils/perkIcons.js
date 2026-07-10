import {IMAGES} from '../assets';

const normalizeIconKey = value =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const PERK_ID_ICONS = {
  3: IMAGES.mealDish,
  4: IMAGES.clinkingGlasses,
  5: IMAGES.mealDish,
  6: IMAGES.Dessert,
  7: IMAGES.clinkingGlasses,
  8: IMAGES.Magic,
  9: IMAGES.beauty,
  10: IMAGES.beauty,
  11: IMAGES.beauty,
  12: IMAGES.beauty,
  13: IMAGES.gym,
  14: IMAGES.gym,
  15: IMAGES.gym,
  16: IMAGES.gym,
  17: IMAGES.clinkingGlasses,
  18: IMAGES.Dessert,
  19: IMAGES.mealDish,
  21: IMAGES.mealDish,
  22: IMAGES.Magic,
  23: IMAGES.Magic,
  24: IMAGES.extraPerson,
};

const PERK_KEY_ICONS = {
  bringextra: IMAGES.extraPerson,
  brunch: IMAGES.mealDish,
  champagne: IMAGES.clinkingGlasses,
  chefpick: IMAGES.mealDish,
  chefspick: IMAGES.mealDish,
  coffee: IMAGES.clinkingGlasses,
  coffees: IMAGES.clinkingGlasses,
  dessert: IMAGES.Dessert,
  desserts: IMAGES.Dessert,
  discount: IMAGES.Magic,
  drink: IMAGES.clinkingGlasses,
  drinks: IMAGES.clinkingGlasses,
  freeproduct: IMAGES.mealDish,
  giftbox: IMAGES.Magic,
  groupclasses: IMAGES.gym,
  gymsession: IMAGES.gym,
  gymsessions: IMAGES.gym,
  haircut: IMAGES.beauty,
  makeup: IMAGES.beauty,
  meal: IMAGES.mealDish,
  meals: IMAGES.mealDish,
  membership: IMAGES.gym,
  pastry: IMAGES.Dessert,
  pastrie: IMAGES.Dessert,
  pastries: IMAGES.Dessert,
  personaltraining: IMAGES.gym,
  plates: IMAGES.mealDish,
  spa: IMAGES.beauty,
  spaaccess: IMAGES.beauty,
  treatment: IMAGES.beauty,
  voucher: IMAGES.Magic,
};

const getRemoteIconSource = service => {
  const icon =
    service?.service_icon?.url ||
    service?.icon?.url ||
    service?.perk?.icon?.url ||
    service?.perk?.icon;

  if (typeof icon === 'string' && icon.startsWith('http')) {
    return {uri: icon};
  }

  return undefined;
};

const getLocalIconSource = service => {
  const candidates = [
    service?.perk?.key,
    service?.key,
    service?.perk?.title,
    service?.title,
    service?.name,
  ];

  for (const candidate of candidates) {
    const icon = PERK_KEY_ICONS[normalizeIconKey(candidate)];

    if (icon) {
      return icon;
    }
  }

  return PERK_ID_ICONS[service?.perk_id];
};

export const getPerkIconSource = service =>
  getRemoteIconSource(service) || getLocalIconSource(service);
