import { WizardStepAgency } from '@components/WizardStepAgency'
import { WizardStepCity } from '@components/WizardStepCity'
import { WizardStepDateOfBirth } from '@components/WizardStepDateOfBirth'
import { WizardStepGender } from '@components/WizardStepGender'
import { WizardStepName } from '@components/WizardStepName'
import { WizardStepSocial } from '@components/WizardStepSocial'

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
    component: WizardStepSocial,
    tKeyHeader: 'wizard.connect',
  },
]
