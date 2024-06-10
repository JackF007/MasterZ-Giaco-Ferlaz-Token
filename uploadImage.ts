import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, createSignerFromKeypair, signerIdentity, Context } from "@metaplex-foundation/umi"
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "./test.json";

// const connection = new Connection("https://api.devnet.solana.com", "finalized");
const umi = createUmi("https://api.devnet.solana.com", "finalized")
umi.use(irysUploader());

// const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
let keyair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keyair);
umi.use(signerIdentity(myKeypairSigner));

(async () => {
    // Utilizzare la path assoluta
    const image = await readFile('./lupo.jpg');
    const nft_image = createGenericFile(image, "Lupo")

    const [myUri] = await umi.uploader.upload([nft_image]);

    console.log(myUri);
})();