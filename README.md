# PayPro - Blockchain-based Recurring Payment System

## Demo Video
[![PayPro Demo](https://img.youtube.com/vi/mhJvtpuE5VI/0.jpg)](https://www.youtube.com/watch?v=mhJvtpuE5VI)
[Watch Demo Video](https://www.youtube.com/watch?v=mhJvtpuE5VI)

A decentralized application for managing recurring payments on Neo X blockchain, automating salary distributions and payment tracking.

## Features

### Organization Portal
- Setup recurring payments
- Track active/past payments
- Process payments
- Modify payment schedules

### Employee Portal
- View upcoming payments
- Track payment history
- Real-time status updates

## Tech Stack
- Next.js 15
- TypeScript
- TailwindCSS
- RainbowKit v2
- Wagmi v2
- Viem
- Ethers.js v5

## Quick Setup

### Prerequisites
- Node.js 18+
- NPM 9+
- Neo X compatible wallet
- GAS tokens

### Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/paypro.git
cd paypro
```

2. Setup environment:
```bash
cp .env.example .env.local
```

3. Configure `.env.local`:
```env
# Required: WalletConnect Project ID
NEXT_PUBLIC_PROJECT_ID="your_wallet_connect_project_id"

# Choose network:
# Mainnet
NEXT_PUBLIC_CONTRACT_ADDRESS="0x33837cCc3fE3774e3b36513c81424E4944D08e57"
# or Testnet
NEXT_PUBLIC_CONTRACT_ADDRESS="0x3b415D08F725C9FFB40861e342dd3eD82a3555F1"
```

4. Install and run:
```bash
npm install
npm run dev
```

## Network Details

### Neo X Mainnet
- Chain ID: 1229
- RPC: https://mainnet.rpc.banelabs.org
- Contract: 0x33837cCc3fE3774e3b36513c81424E4944D08e57

### Neo X Testnet
- Chain ID: 12227332
- RPC: https://testnet.rpc.banelabs.org
- Contract: 0x3b415D08F725C9FFB40861e342dd3eD82a3555F1

## Demo Accounts

### Organization
```
Email: admin@techcorp.com
Password: admin123
```

### Employee
```
Email: john@techcorp.com
Password: employee123
```

## Smart Contract Functions

### Core
- `setupRecurringPayment(address recipient, uint96 amount, uint64 interval)`
- `processRecurringPayment(uint256 paymentId)`
- `cancelRecurringPayment(uint256 paymentId)`
- `updateRecurringPayment(uint256 paymentId, uint96 newAmount, uint64 newInterval)`

### View
- `getActivePaymentIds()`
- `getPaymentStats()`
- `canProcessPayment(uint256 paymentId)`

## Troubleshooting

1. **Wallet Issues**
   - Verify network (Mainnet/Testnet)
   - Check GAS balance
   - Ensure correct RPC settings

2. **Transaction Failures**
   - Confirm GAS balance
   - Verify recipient address
   - Check payment parameters

## License

MIT License