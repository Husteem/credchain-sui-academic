import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';


interface WalletConnectionProps {
  onBack: () => void;
  onConnect: (address: string) => void;
  role: 'admin' | 'issuer' | 'student' | 'verifier';
}

export function WalletConnection({ onBack, onConnect, role }: WalletConnectionProps) {
  
  const account = useCurrentAccount();
  const navigate = useNavigate();

   useEffect(() => {
    if (account) {
      // Connection successful
      console.log('Wallet connected:', account.address);
      // Place your logic here (e.g., fetch user data, show a toast, etc.)
      onConnect(account.address);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to wallet: ${account.address}`,
      })
    } else {
      // Disconnected or not connected
      console.log('Wallet not connected');
      navigate('/'); // Redirect to home if not connected
      toast({
        title: "Wallet Disconnected",
        description: "You are not connected to any wallet. Please connect to continue.",
        variant: "destructive" 
      });
    }
  }, [account]);


  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection - replace with actual Sui wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      onConnect(mockAddress);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your Sui wallet",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const roleConfig = {
    admin: {
      title: 'Admin Dashboard',
      description: 'Connect your admin wallet to manage credential issuers',
      color: 'bg-gradient-primary'
    },
    issuer: {
      title: 'Issuer Portal',
      description: 'Connect your wallet to issue academic credentials',
      color: 'bg-gradient-to-r from-secondary to-secondary/80'
    },
    student: {
      title: 'Student Portal',
      description: 'Connect your wallet to view your credentials',
      color: 'bg-gradient-accent'
    },
    verifier: {
      title: 'Verifier Interface',
      description: 'Connect your wallet to verify credentials',
      color: 'bg-gradient-card'
    }
  };

  const config = roleConfig[role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-elegant animate-fade-in">
          <div className="text-center space-y-6">
            <div className={`w-20 h-20 mx-auto ${config.color} rounded-full flex items-center justify-center`}>
              <Wallet className="w-10 h-10 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">{config.title}</h1>
              <p className="text-muted-foreground">{config.description}</p>
            </div>

            <div className="space-y-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Sui Wallet'}
              </Button>
              <ConnectButton
                color="primary"
                size="lg" 
                className="w-full" />
              <div className="text-xs text-muted-foreground">
                Make sure you have a Sui wallet installed and set to the correct network
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 bg-gradient-card rounded-lg p-6 shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="font-semibold mb-3">Supported Wallets</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>• Sui Wallet</div>
            <div>• Suiet Wallet</div>
            <div>• Ethos Wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
}