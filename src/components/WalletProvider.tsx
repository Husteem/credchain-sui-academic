import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { createNetworkConfig, SuiClientProvider, WalletProvider as SuiWalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig } = createNetworkConfig({
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

interface WalletProviderProps {
  children: React.ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiWalletProvider>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          {children}
        </SuiClientProvider>
      </SuiWalletProvider>
    </QueryClientProvider>
  );
}