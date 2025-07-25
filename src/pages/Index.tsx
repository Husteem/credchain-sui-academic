import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { WalletConnection } from '@/components/WalletConnection';
import { AdminDashboard } from '@/components/AdminDashboard';
import { IssuerPortal } from '@/components/IssuerPortal';
import { StudentPortal } from '@/components/StudentPortal';
import { VerifierInterface } from '@/components/VerifierInterface';

type AppState = 
  | { screen: 'home' }
  | { screen: 'wallet'; role: 'admin' | 'issuer' | 'student' | 'verifier' }
  | { screen: 'dashboard'; role: 'admin' | 'issuer' | 'student' | 'verifier'; walletAddress: string };

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ screen: 'home' });

  const handleSelectRole = (role: 'admin' | 'issuer' | 'student' | 'verifier') => {
    setAppState({ screen: 'wallet', role });
  };

  const handleWalletConnect = (walletAddress: string) => {
    if (appState.screen === 'wallet') {
      setAppState({ 
        screen: 'dashboard', 
        role: appState.role, 
        walletAddress 
      });
    }
  };

  const handleBack = () => {
    setAppState({ screen: 'home' });
  };

  if (appState.screen === 'home') {
    return <Navigation onSelectRole={handleSelectRole} />;
  }

  if (appState.screen === 'wallet') {
    return (
      <WalletConnection 
        role={appState.role}
        onBack={handleBack}
        onConnect={handleWalletConnect}
      />
    );
  }

  if (appState.screen === 'dashboard') {
    const { role, walletAddress } = appState;
    
    switch (role) {
      case 'admin':
        return <AdminDashboard onBack={handleBack} walletAddress={walletAddress} />;
      case 'issuer':
        return <IssuerPortal onBack={handleBack} walletAddress={walletAddress} />;
      case 'student':
        return <StudentPortal onBack={handleBack} walletAddress={walletAddress} />;
      case 'verifier':
        return <VerifierInterface onBack={handleBack} walletAddress={walletAddress} />;
      default:
        return <Navigation onSelectRole={handleSelectRole} />;
    }
  }

  return <Navigation onSelectRole={handleSelectRole} />;
};

export default Index;
