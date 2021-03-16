import { WizardStepGender } from '@components/WizardStepGender'
import { WizardStepName } from '@components/WizardStepName'

export const STEPS = [
  {
    component: WizardStepGender,
    tKeyHeader: 'wizard.genderStep',
  },
  {
    component: WizardStepName,
    tKeyDescription: 'wizard.nameStep',
  },
]
