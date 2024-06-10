import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "./test.json";

// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "finalized");


(async () => {
    try {
        
        
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Indirizzo del wallet a cui inviare i fondi
            3 * LAMPORTS_PER_SOL    // Quantità di SOL richiesta (3 SOL = 1_000_000_000 LAMPORTS)
        );

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();

