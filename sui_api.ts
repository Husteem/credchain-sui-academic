// suiClient.ts
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, REGISTRY_OBJECT_ID } from './constants';


export const NETWORK = 'testnet'; // or 'mainnet' / 'devnet'
export const suiClient = new SuiClient({ url: getFullnodeUrl(NETWORK) });

export interface TransactionResult {
  success: boolean;
  digest?: string;
  error?: string;
}



export async function addIssuerWithWallet(
  signer: any,
  newIssuerAddress: string
): Promise<TransactionResult> {
  try {
    const txb = new Transaction();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::add_issuer`,
      arguments: [
        txb.object(REGISTRY_OBJECT_ID),
        txb.pure(newIssuerAddress),
      ],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return {
      success: result.effects?.status?.status === 'success',
      digest: result.digest,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}




export async function issueCredentialWithWallet(
  signer: any,
  recipientAddress: string,
  course: string,
  metadataUrl: string,
  issuedAt?: number
): Promise<TransactionResult> {
  try {
    const txb = new Transaction();
    const timestamp = issuedAt || Date.now();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::issue_credential`,
      arguments: [
        txb.object(REGISTRY_OBJECT_ID),
        txb.pure(recipientAddress),
        txb.pure(Array.from(new TextEncoder().encode(course))),
        txb.pure(Array.from(new TextEncoder().encode(metadataUrl))),
        txb.pure(timestamp),
      ],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    return {
      success: result.effects?.status?.status === 'success',
      digest: result.digest,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}


export async function removeIssuerWithWallet(
  signer: any,
  issuerToRemove: string
): Promise<TransactionResult> {
  try {
    const txb = new Transaction();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::remove_issuer`,
      arguments: [
        txb.object(REGISTRY_OBJECT_ID),
        txb.pure(issuerToRemove),
      ],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return {
      success: result.effects?.status?.status === 'success',
      digest: result.digest,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}



export async function revokeCredentialWithWallet(
  signer: any,
  credentialId: string
): Promise<TransactionResult> {
  try {
    const txb = new Transaction();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::revoke_credential`,
      arguments: [txb.object(credentialId)],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });

    return {
      success: result.effects?.status?.status === 'success',
      digest: result.digest,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}



export async function verifyCredential(credentialId: string, verifier: string): Promise<boolean> {
  try {
    const txb = new Transaction();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::verify_credential`,
      arguments: [txb.object(credentialId)],
    });

    const result = await suiClient.devInspectTransactionBlock({
      transactionBlock: txb,
      sender: verifier,
    });

    const returnVal = result.results?.[0]?.returnValues?.[0];
    if (returnVal) {
      const [value] = returnVal;
      return value[0] === 1;
    }

    return false;
  } catch (error) {
    console.error('Error verifying credential:', error);
    return false;
  }
}


export async function getAuthorizedIssuers(admin_address: string): Promise<string[]> {
  try {
    const txb = new Transaction();

    txb.moveCall({
      target: `${PACKAGE_ID}::academic_credentials::get_authorized_issuers`,
      arguments: [txb.object(REGISTRY_OBJECT_ID)],
    });

    const result = await suiClient.devInspectTransactionBlock({
      transactionBlock: txb,
      sender: admin_address,
    });

    // For now return empty and log output for debugging
    console.log('Inspect result:', result);
    return [];
  } catch (error) {
    console.error('Error fetching issuers:', error);
    return [];
  }
}

