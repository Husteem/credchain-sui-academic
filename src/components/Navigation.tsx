import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Shield, Users, FileCheck } from 'lucide-react';
import heroImage from '@/assets/hero-blockchain-education.jpg';

import { ConnectButton } from '@mysten/dapp-kit';


interface NavigationProps {
  onSelectRole: (role: 'admin' | 'issuer' | 'student' | 'verifier') => void;
}

export function Navigation({ onSelectRole }: NavigationProps) {
  const roles = [
    {
      id: 'admin' as const,
      title: 'Admin Dashboard',
      description: 'Manage authorized credential issuers',
      icon: Shield,
      color: 'primary'
    },
    {
      id: 'issuer' as const,
      title: 'Issuer Portal',
      description: 'Issue academic credentials',
      icon: GraduationCap,
      color: 'secondary'
    },
    {
      id: 'student' as const,
      title: 'Student Portal',
      description: 'View and share your credentials',
      icon: Users,
      color: 'credential'
    },
    {
      id: 'verifier' as const,
      title: 'Verifier Interface',
      description: 'Verify credential authenticity',
      icon: FileCheck,
      color: 'portal'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Blockchain Education Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 flex items-center justify-center">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-6xl font-bold mb-4">
              CredChain
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-6">
              Decentralized Academic Credential System powered by Sui Blockchain
            </p>
            <div className="text-sm opacity-90">
              Secure • Transparent • Verifiable
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-6 -mt-20 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.id} 
                className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer animate-fade-in border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onSelectRole(role.id)}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <Button 
                    variant={role.color as any} 
                    className="w-full"
                    size="sm"
                  >
                    Enter Portal
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-card rounded-lg p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-4">Secure. Transparent. Verifiable.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Blockchain Security</h4>
                <p>Credentials stored immutably on Sui blockchain</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Instant Verification</h4>
                <p>Real-time credential authenticity checks</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Student Control</h4>
                <p>Students own and control their credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}