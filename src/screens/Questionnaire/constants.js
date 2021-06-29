import { QuestionnaireStepBrands } from '@components/QuestionnaireStepBrands'
import { QuestionnaireStepCreams } from '@components/QuestionnaireStepCreams'
import { QuestionnaireStepSkin } from '@components/QuestionnaireStepSkin'
import { QuestionnaireStepSkincare } from '@components/QuestionnaireStepSkincare'

export const STEPS = [
  {
    component: QuestionnaireStepSkin,
    tKeyHeader: 'questionnaire.kindOfSkin',
  },
  {
    component: QuestionnaireStepSkincare,
    tKeyHeader: 'questionnaire.doYouHaveSkincare',
  },
  {
    component: QuestionnaireStepCreams,
    tKeyHeader: 'questionnaire.typeCreams',
  },
  {
    component: QuestionnaireStepBrands,
    tKeyHeader: 'questionnaire.selectBrands',
  },
]
