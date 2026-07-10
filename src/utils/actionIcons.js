import {IMAGES} from '../assets';

const normalizeIconKey = value =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const ACTION_KEY_ICONS = {
  maps: IMAGES.googleMaps,
  postgallery: IMAGES.gallery,
  story: IMAGES.storyAddNew,
  tiktok: IMAGES.tiktokAddNew,
  tripadvisor: IMAGES.internet,
};

const getRemoteActionIconSource = action => {
  const icon =
    action?.Action_icon?.url ||
    action?.action_icon?.url ||
    action?.icon?.url ||
    action?.icon;

  if (typeof icon === 'string' && icon.startsWith('http')) {
    return {uri: icon};
  }

  if (typeof action?.action_icon === 'number') {
    return action.action_icon;
  }

  return undefined;
};

const getLocalActionIconSource = action => {
  const candidates = [
    action?.key,
    action?.title,
    action?.Action_Name,
    action?.action_name,
  ];

  for (const candidate of candidates) {
    const icon = ACTION_KEY_ICONS[normalizeIconKey(candidate)];

    if (icon) {
      return icon;
    }
  }

  return undefined;
};

export const getActionIconSource = action =>
  getRemoteActionIconSource(action) || getLocalActionIconSource(action);
