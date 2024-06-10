import { Keypair } from "@solana/web3.js";



// Andiamo a generare una nuova Keypair
const keypair = Keypair.generate();

console.log("Public Key:",keypair.publicKey.toBase58());
console.log("Private Key:",keypair.secretKey.toString());
