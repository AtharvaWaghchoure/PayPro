// app/providers.tsx
'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const neoXTestnet = {
  id: 12227332,
  name: 'Neo X Testnet',
  nativeCurrency: {
    name: 'GAS',
    symbol: 'GAS',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: ['https://testnet.rpc.banelabs.org']
    },
    public: { 
      http: ['https://testnet.rpc.banelabs.org']
    }
  },
} as const;

const config = getDefaultConfig({
  appName: 'PayPro',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [neoXTestnet],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}




















// // app/providers.tsx
// 'use client';

// import { http, createConfig } from 'wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {
//   RainbowKitProvider,
//   getDefaultWallets,
//   getDefaultConfig,
// } from '@rainbow-me/rainbowkit';

// // Define Neo X Testnet chain
// const neoXTestnet = {
//   id: 12227332,
//   name: 'Neo X Testnet',
//   nativeCurrency: {
//     name: 'GAS',
//     symbol: 'GAS',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: { 
//       http: ['https://testnet.rpc.banelabs.org']
//     },
//   },
// } as const;

// // Configure wagmi and rainbowkit
// const config = getDefaultConfig({
//   appName: 'PayPro',
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
//   chains: [neoXTestnet],
//   transports: {
//     [neoXTestnet.id]: http(),
//   },
// });

// const queryClient = new QueryClient();

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <RainbowKitProvider>
//         {children}
//       </RainbowKitProvider>
//     </QueryClientProvider>
//   );
// }












// // // app/providers.tsx
// // 'use client';

// // import { WagmiConfig, createConfig } from 'wagmi';
// // import { mainnet, sepolia } from 'wagmi/chains';
// // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// // import {
// //   RainbowKitProvider,
// //   getDefaultWallets,
// //   connectorsForWallets,
// // } from '@rainbow-me/rainbowkit';
// // import { CHAIN_CONFIG } from '@/lib/config';

// // const { wallets } = getDefaultWallets({
// //   appName: 'PayPro',
// //   projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
// //   chains: [CHAIN_CONFIG],
// // });

// // const connectors = connectorsForWallets([...wallets]);

// // const wagmiConfig = createConfig({
// //   connectors,
// //   publicClient: {
// //     chainId: CHAIN_CONFIG.id,
// //     http: CHAIN_CONFIG.rpcUrls.default.http[0],
// //   },
// // });

// // const queryClient = new QueryClient();

// // export function Providers({ children }: { children: React.ReactNode }) {
// //   return (
// //     <WagmiConfig config={wagmiConfig}>
// //       <QueryClientProvider client={queryClient}>
// //         <RainbowKitProvider chains={[CHAIN_CONFIG]}>
// //           {children}
// //         </RainbowKitProvider>
// //       </QueryClientProvider>
// //     </WagmiConfig>
// //   );
// // }