import React, { useContext, createContext } from 'react'

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { createCampaign } from '../assets'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xED66335D76742802c3F9Af5B89bdfAE0F7587209')

  const { mutateAsync: CreateCampaign } = useContractWrite(
    contract,
    'createCampaign'
  )

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,

        console.log('contract call sucess', data),
      ])
    } catch (error) {
      console.log('contract call failure', error)
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
