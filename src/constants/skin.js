import { IMAGES } from '../assets/images'

export const SKIN_NORMAL = {
  tKeyLabel: 'questionnaire.normal',
  value: 'normal',
}
const SKIN_OILY = {
  tKeyLabel: 'questionnaire.oily',
  value: 'oily',
}
const SKIN_DRY = {
  tKeyLabel: 'questionnaire.dry',
  value: 'dry',
}
const SKIN_SENSITIVE = {
  tKeyLabel: 'questionnaire.sensitive',
  value: 'sensitive',
}
const SKIN_ACNE = {
  tKeyLabel: 'questionnaire.acne',
  value: 'acne',
}
const SKIN_AGING = {
  tKeyLabel: 'questionnaire.aging',
  value: 'aging',
}

export const IMAGE_FOR_SKIN = {
  [SKIN_NORMAL.value]: IMAGES.normal,
  [SKIN_AGING.value]: IMAGES.aging,
  [SKIN_ACNE.value]: IMAGES.acne,
  [SKIN_SENSITIVE.value]: IMAGES.normal,
  [SKIN_DRY.value]: IMAGES.dry,
  [SKIN_OILY.value]: IMAGES.oily,
}

export const SKIN_OPTIONS = [SKIN_NORMAL, SKIN_OILY, SKIN_DRY, SKIN_SENSITIVE, SKIN_ACNE, SKIN_AGING]
