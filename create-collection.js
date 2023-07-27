import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const contractAddress = 'archway1sjhht23xf9m9f8vu9cvhujad3n6c7nhgl83w3aqt8szmnh4ghueq5jkj9d';


const data = {
  collection_name: 'test',
  token_symbol: 'TS',
  metadata: {
    social_links: {
      website: 'test.website.com',
      medium: 'test.medium.com',
      twitter: 'test.twitter.com',
      instagram: 'test.instagram.com',
      discord: 'test.discord.com',
      telegram: 'test.telegram.com',
    },
    sensitive_content: true,
    finalize_collection: true,
    category: ['pfps', 'memes', 'collectibles', 'photography'],
    description: 'test description',
    banner_image: 'https://ik.imagekit.io/fmivn9lzw/1_AxPM09Ot1.png',
    profile_image: 'https://ik.imagekit.io/fmivn9lzw/1_C_FB4vklOD.png',
    wallet_address: { '0': { address: 'test_wallet', value: '5' }, '1': { address: 'test_wallet_2', value: '5' } }
  }
};


const createCollectionMsgNew = {
  "add_collection": {
    "msg": {
      "create": {
        "init": {
          "name": "ArchwayFriends",
          "symbol": "FREND",
          "minter": "archway1lx4u2ymzrs6udw0xc35kwnvfxpf6nm52yl7v6a",
          "metadata": {
            "banner": "test",
            "profile_image": "test",
            "description": "TestCollection",
            "categories": ["Art"],
            "website": "link",
            "explicit_content": true
          }
        },
        "label": "Test"
      }
    }
  }
};

const { transactionHash } = await client.execute(
  accounts[0].address,
  contractAddress,
  createCollectionMsgNew,
  "auto"
);

console.log(transactionHash);