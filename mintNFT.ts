import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { base58 } from '@metaplex-foundation/umi/serializers';

import wallet from "./test.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized")

let keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner)).use(mplTokenMetadata());

const name = "MasterZ Giaco NFT";
const uri = "https://arweave.net/FM2nH8a3Rdd_DL_EgOKHmZnRLp7pNKur7mJI_qhaQh0"
const mint = generateSigner(umi);
const sellerFeeBasisPoints = percentAmount(5, 2);

(async () => {

    let tx = createNft(
        umi,
        {
            mint,
            name,
            uri,
            sellerFeeBasisPoints,
        }
    );

    let result = await tx.sendAndConfirm(umi);
    const signauture = base58.deserialize(result.signature);
    console.log(signauture);

})();