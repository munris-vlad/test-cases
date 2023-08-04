import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const marketContractAddress = 'archway1cwx58k4xew5zrc4zqs888w58fhckvn09ryh02qx03dv83g8d6fyq6kcl3s';
const contractAddress = 'archway1p60gpene0yu5dz7gl8npaesdr7c0hwt6rlh6yuvnq5ygynp3cffsq4crft'; // collection address


let metadata = {
  'link': '123',
  'some_attributes': {
    'attribute': 'value'
  }
}

let tokens = [];

for (let i = 1102; i < 1202; i++) {
  tokens.push({
    "token_id": i.toString(),
    "owner": accounts[0].address,
    "token_uri": "https://ik.imagekit.io/fmivn9lzw/1_C_FB4vklOD.png",
    "extension": JSON.stringify(metadata)
  });
}

const auctionNftMsg = `{"auction":{"token":{"native":{"denom":"const"}},"amount":"100","duration":1000}}`;

console.log(auctionNftMsg);

const gasPrice = GasPrice.fromString("1000000000000aconst");
const token_id = 1;
const { transactionHash } = await client.execute(
  accounts[0].address,
  contractAddress,
  { 
    send_nft: { 
      contract: marketContractAddress, 
      token_id: token_id.toString(), 
      msg: Buffer.from(auctionNftMsg).toString("base64") 
    } 
  },
  calculateFee(500000, gasPrice),
  ""
);

console.log(transactionHash);