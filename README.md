# CredChain 

**A decentralized academic credentialing system built on the Sui blockchain.**

---

##  Overview

CredChain enables educational institutions, bootcamps, NGOs, and training providers to issue **tamper-proof academic credentials** directly on the blockchain. Built entirely on the **Sui blockchain** using **Move smart contracts** and a **React frontend**, CredChain empowers students to **own**, **verify**, and **share** their academic achievements without relying on paper documents or institutional bureaucracy.

---

##  Features

-  **Role-Based Access Control**  
  - Admins authorize new issuers using `add_issuer()`
  - Issuers can issue credentials only if whitelisted
-  **Credential Issuance**  
  - On-chain Move object: `recipient`, `issuer`, `course`, `issued_at`, `metadata_url`, `is_revoked`
-  **Student Portal**  
  - View all owned credentials
  - See details including course name, issuer, and status
-  **Verifier Interface**  
  - Enter shared credential ID to confirm authenticity (frontend-only QR and link-based logic for now)

---

## 🔧 Tech Stack

| Layer | Stack |
|-------|-------|
| **Blockchain** | [Sui Blockchain](https://sui.io) |
| **Smart Contract Language** | Move |
| **Frontend Framework** | React (Vite) + Tailwind CSS |
| **Wallet Integration** | Slush |
| **State Management** | React Context |
| **Data Storage** | Sui On-Chain Object Model (Move) |
| **QR/Link Share** | Frontend-only preview & selective display |

---

## 🔍 Contract Design

**Credential Object:**
```move
struct Credential {
    recipient: address,
    issuer: address,
    course: string,
    issued_at: u64,
    metadata_url: string,
    is_revoked: bool
}

Key Functions:

add_issuer() → Admin-only function to authorize credential issuers

issue_credential() → Issuers use this to create on-chain credential objects

verify_credential() → Utility call to confirm credential info

 How It Works
Admin connects Sui wallet and whitelists issuers

Issuer connects and issues credentials to recipient addresses

Student logs in and views owned credentials

Verifier accesses the shared credential ID through a link or QR code - frontend



Roadmap
| Feature                                       | Status        |
| --------------------------------------------- | ------------- |
| IPFS metadata integration (via Tusk + Walrus) |  Planned     |
| On-chain QR and verifiable links              |  Planned     |
| Credential revocation mechanism               |  Implemented |
| UI/UX polishing for mobile                    |  Done        |
| Multi-role frontend SPA                       |  Done        |



 Local Development
 Requirements
Node.js v18+

Sui CLI (sui installed and configured)

Git

 Setup
# Clone the repo
git clone https://github.com/Husteem/credchain-sui-academic.git
cd credchain-sui-academic

# Install frontend dependencies
npm install

# Start the dev server
npm run dev

TEAM
Main
Naim Hussain – muhdnaimhussain@gmail.com
Muhammad Hamza – hamza.00dev1@gmail.com

Contributors
Hafiz Hussain – hafizhussain938@gmail.com
Aliyu Muhammad Sani – aleeyumuhd4ever2020@gmail.com
Sulaiman mazeedah - mazeedahogere@gmail.com

 License
MIT License. Free to use, fork, and extend — but credit the original authors.

