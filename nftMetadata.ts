import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionArgs, CreateMetadataAccountV3InstructionAccounts, DataV2Args, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { publicKey as publicKeySerializer, string} from '@metaplex-foundation/umi/serializers';
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "./test.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized")

let keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner)).use(irysUploader());

(async () => {

    const metadata = {
        name: "MasterZ Giaco NFT",
        symbol: "MGNFT",
        description: "NFT di esempio per il corso di Blockchain MasterZ",
        image: "https://arweave.net/6KnyZSORqAA0cXQOG4V2VWT58HOGzq616ZJLfpBXW4g",
        attributes: [
            {
                trait_type: "Rarity",
                value: "Common"
            },
            {
                trait_type: "Author",
                value: "Giacomo Ferlaino"
            }
        ],
        proprieties: {
            files: [
                {
                    type: "image/jpg",
                    uri: "https://arweave.net/6KnyZSORqAA0cXQOG4V2VWT58HOGzq616ZJLfpBXW4g"
                }
            ]
        }
    }

    const nftUri = await umi.uploader.uploadJson(metadata);
    console.log("Your Uri:", nftUri);
})();