import { WizardStepAgency } from '@components/WizardStepAgency'
import { WizardStepCity } from '@components/WizardStepCity'
import { WizardStepCode } from '@components/WizardStepCode'
import { WizardStepDateOfBirth } from '@components/WizardStepDateOfBirth'
import { WizardStepGender } from '@components/WizardStepGender'
import { WizardStepName } from '@components/WizardStepName'
import { WizardStepReview } from '@components/WizardStepReview'
import { WizardStepSocial } from '@components/WizardStepSocial'
import { WizardStepExperience } from '@components/WizardStepYourExperience'

export const STEPS = [
  {
    component: WizardStepName,
    tKeyDescription: 'wizard.nameStep',
  },
  {
    component: WizardStepGender,
    tKeyHeader: 'wizard.genderStep',
  },
  {
    component: WizardStepDateOfBirth,
    tKeyHeader: 'wizard.dateOfBirth',
  },
  {
    component: WizardStepCity,
    tKeyHeader: 'wizard.city',
  },
  {
    component: WizardStepAgency,
    tKeyHeader: 'wizard.agency',
  },
  {
    component: WizardStepExperience,
    tKeyHeader: 'experience.title',
  },
  {
    component: WizardStepCode,
    tKeyDescription: 'code.description',
    tKeyHeader: 'code.title',
  },
  {
    component: WizardStepSocial,
    tKeyHeader: 'wizard.connect',
  },
  {
    component: WizardStepReview,
  },
]
