import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionArgs, CreateMetadataAccountV3InstructionAccounts, DataV2Args, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { publicKey as publicKeySerializer, string} from '@metaplex-foundation/umi/serializers';

import wallet from "./test.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized")

let keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner));

// const mint = new PublicKey("DuzVYrEA6CAJCVuS8nAqfMuN8cVXKheJvn35i3y8NrDi");
const mint = publicKey("2t8Jq1mVKPrR9uUNe5pfznK7qZNo922VPjC1bd1Kbz5W");


(async() => {

    let accounts: CreateMetadataAccountV3InstructionAccounts = {
       // metadata: metadata,
        mint: mint,
        mintAuthority: myKeypairSigner,
    }

    let data: DataV2Args = {
        name: "X FerlaZ Token",
        symbol: "GFT",
        uri: "https://arweave.net/FM2nH8a3Rdd_DL_EgOKHmZnRLp7pNKur7mJI_qhaQh0",
        sellerFeeBasisPoints: 500,
        creators: [
            {
                address: keyair.publicKey,
                verified: true,
                share: 100,
            }
        ],
        collection: null,
        uses: null,
    }

    let args: CreateMetadataAccountV3InstructionArgs = {
        data: data,
        isMutable: true,
        collectionDetails: null,
    }

    let tx = createMetadataAccountV3(
        umi,
        {
            ...accounts,
            ...args,
        }
    )

    let result = await tx.sendAndConfirm(umi);

    const signature = umi.transactions.deserialize(result.signature);
    console.log(`Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`)

})();