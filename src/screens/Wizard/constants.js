import { WizardStepAgency } from '@components/WizardStepAgency'
import { WizardStepCity } from '@components/WizardStepCity'
import { WizardStepDateOfBirth } from '@components/WizardStepDateOfBirth'
import { WizardStepGender } from '@components/WizardStepGender'
import { WizardStepName } from '@components/WizardStepName'
import { WizardStepSocial } from '@components/WizardStepSocial'

export const STEPS = [
  {
    component: WizardStepSocial,
    tKeyHeader: 'wizard.connect',
  },
  {
    component: WizardStepAgency,
    tKeyHeader: 'wizard.agency',
  },
  {
    component: WizardStepCity,
    tKeyHeader: 'wizard.city',
  },
  {
    component: WizardStepDateOfBirth,
    tKeyHeader: 'wizard.dateOfBirth',
  },
  {
    component: WizardStepName,
    tKeyDescription: 'wizard.nameStep',
  },
  {
    component: WizardStepGender,
    tKeyHeader: 'wizard.genderStep',
  },
]
