import { Contract, ElectrumNetworkProvider } from "cashscript"
import { addressToPkhash } from "../lib/common.js"
import PasswordVaultArtifact from './PasswordVault.json' assert { type: 'json' }

// set up network provider
const provider = new ElectrumNetworkProvider('mainnet')

// setup contract arguments based on contract parameters
const contractArgs = [
  // payout
  1234n, // do not replace
  // ownerPkhash
  addressToPkhash('bitcoincash:qqx5mk6nzxu56vqk0d8626e70k2cpcjw5vdtm3d7yn'), // replace address with your Paytaca wallet address
  // passcode
  '123456', // replace with your password or keep the default one
]

// instantiate contract
export const passwordVaultContract = new Contract(PasswordVaultArtifact, contractArgs, { provider })
console.log(passwordVaultContract.address);