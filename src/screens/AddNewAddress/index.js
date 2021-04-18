import React, { useState } from 'react'

import { AddNewAddressPresenter } from './AddNewAddressPresenter'

export const AddNewAddress = () => {
  const [address, setAddress] = useState('')
  const props = { address, setAddress }

  return <AddNewAddressPresenter {...props} />
}
