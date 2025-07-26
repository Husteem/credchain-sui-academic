// The package ID of your published Move module
export const PACKAGE_ID = "0xc3beb6314754aa1a4bb148d70f5d613d7ab451e71d4baec7fe6914ff237fad73";

// The IssuerRegistry object ID (needed for registry-related functions)
export const REGISTRY_OBJECT_ID = "0xe9b5c276640619352b31b5c2bb13973c37e3751d9c7c0d47207d1cd058e7facf";

// For credential-related functions, you will need to provide the specific Credential object ID at runtime
// Example placeholder:
// export const CREDENTIAL_OBJECT_ID = "<YOUR_CREDENTIAL_OBJECT_ID_HERE>";

// Usage mapping for clarity:

// add_issuer, remove_issuer, issue_credential, get_authorized_issuers
//   => REGISTRY_OBJECT_ID

// revoke_credential, verify_credential, get_credential_* (read)
//   => CREDENTIAL_OBJECT_ID

// Example usage in function calls:
//
// addIssuer(REGISTRY_OBJECT_ID, ...);
// removeIssuer(REGISTRY_OBJECT_ID, ...);
// issueCredential(REGISTRY_OBJECT_ID, ...);
// getAuthorizedIssuers(REGISTRY_OBJECT_ID);
//
// revokeCredential(CREDENTIAL_OBJECT_ID, ...);
// verifyCredential(CREDENTIAL_OBJECT_ID, ...);
// getCredentialDetails(CREDENTIAL_OBJECT_ID, ...);
