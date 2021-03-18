import { WizardStepAgency } from '@components/WizardStepAgency'
import { WizardStepCity } from '@components/WizardStepCity'
import { WizardStepDateOfBirth } from '@components/WizardStepDateOfBirth'
import { WizardStepGender } from '@components/WizardStepGender'
import { WizardStepName } from '@components/WizardStepName'

export const STEPS = [
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
