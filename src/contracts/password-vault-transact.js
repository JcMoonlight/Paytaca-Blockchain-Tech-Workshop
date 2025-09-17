import { ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { passwordVaultContract } from './password-vault-instantiate.js'

// set up network provider
const provider = new ElectrumNetworkProvider('mainnet')

// instantiate Transaction Builder
const transactionBuilder = new TransactionBuilder({ provider })

// get the utxos of the contract
const inputs = await passwordVaultContract.getUtxos()

// get balance of 0th (1st) utxo
const balance = inputs[0].satoshis

// declare the output
const toSendAmount = 1_234n
const outputs = [
    {
        to: 'bitcoincash:qqx5mk6nzxu56vqk0d8626e70k2cpcjw5vdtm3d7yn', // replace address with your Paytaca wallet address
        amount: toSendAmount
    },
    // change address (back to contract)
    {
        to: passwordVaultContract.address,
        amount: balance - toSendAmount - 300n
    }
]

// build the transaction 
const transaction = transactionBuilder
    .addInput(
        // utxo
        inputs[0],
        // unlocker
        passwordVaultContract.unlock.claim('123456')
    )
    .addOutputs(outputs)
    .send();
    console.log(transaction)