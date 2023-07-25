import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const hubContractAddress = 'archway1hwflc4hy67gtn9e2n83qvp3krjwavjpcammajatgseq5xf6q4wwqnyq4md';

const client = await SigningArchwayClient.connectWithSigner(network.endpoint);

const collectionsMsg = {
  collections: {
    "pagination": {
      "limit": 10,
      "order": "ascending",
      "page": "1"
    }
  },
};

const collections = await client.queryContractSmart(
  hubContractAddress,
  collectionsMsg
);

console.log(collections);