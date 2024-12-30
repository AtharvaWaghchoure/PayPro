export const HARDCODED_USERS = {
    organization: {
      id: '1',
      email: 'admin@techcorp.com',
      password: 'admin123',
      name: 'TechCorp Inc.',
      type: 'organization'
    },
    employee: {
      id: '1',
      email: 'john@techcorp.com',
      password: 'employee123',
      name: 'John Doe',
      type: 'employee',
      walletAddress: 'put the wallet address'
    }
  };
  
  export const CHAIN_CONFIG = {
    id: 12227332,
    name: 'Neo X Testnet',
    network: 'neox-testnet',
    nativeCurrency: {
      name: 'GAS',
      symbol: 'GAS',
      decimals: 18,
    },
    rpcUrls: {
      public: { http: ['https://testnet.rpc.banelabs.org'] },
      default: { http: ['https://testnet.rpc.banelabs.org'] },
    },
  } as const;