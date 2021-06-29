const GENDER_FEMALE = {
  tKeyLabel: 'gender.female',
  value: 'female',
}
const GENDER_MALE = {
  tKeyLabel: 'gender.male',
  value: 'male',
}
const GENDER_NON_BINARY = {
  tKeyLabel: 'gender.nonBinary',
  value: 'nonBinary',
}
const GENDER_PREFER_NOT_TO_SAY = {
  tKeyLabel: 'gender.preferNotToSay',
  value: 'preferNotToSay',
}

export const GENDER_OPTIONS = [GENDER_FEMALE, GENDER_MALE, GENDER_NON_BINARY, GENDER_PREFER_NOT_TO_SAY]

export const GENDER_LABELS = {
  [GENDER_FEMALE.value]: GENDER_FEMALE.tKeyLabel,
  [GENDER_MALE.value]: GENDER_MALE.tKeyLabel,
  [GENDER_NON_BINARY.value]: GENDER_NON_BINARY.tKeyLabel,
  [GENDER_PREFER_NOT_TO_SAY.value]: GENDER_PREFER_NOT_TO_SAY.tKeyLabel,
}
