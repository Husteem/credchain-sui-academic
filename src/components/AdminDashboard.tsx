import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Plus, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onBack: () => void;
  walletAddress: string;
}

export function AdminDashboard({ onBack, walletAddress }: AdminDashboardProps) {
  const [newIssuerAddress, setNewIssuerAddress] = useState('');
  const [isAddingIssuer, setIsAddingIssuer] = useState(false);
  const [authorizedIssuers, setAuthorizedIssuers] = useState([
    '0x1234567890abcdef1234567890abcdef12345678',
    '0xabcdef1234567890abcdef1234567890abcdef12'
  ]);
  const { toast } = useToast();

  const handleAddIssuer = async () => {
    if (!newIssuerAddress) return;
    
    setIsAddingIssuer(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAuthorizedIssuers([...authorizedIssuers, newIssuerAddress]);
      setNewIssuerAddress('');
      
      toast({
        title: "Issuer Added Successfully",
        description: `Address ${newIssuerAddress.slice(0, 10)}... is now authorized to issue credentials`,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to add issuer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingIssuer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage authorized credential issuers</p>
            </div>
          </div>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <p className="font-mono text-sm">{walletAddress}</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Admin Access</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Issuer */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Issuer
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="issuerAddress">Issuer Wallet Address</Label>
                <Input
                  id="issuerAddress"
                  placeholder="0x..."
                  value={newIssuerAddress}
                  onChange={(e) => setNewIssuerAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleAddIssuer}
                disabled={!newIssuerAddress || isAddingIssuer}
              >
                {isAddingIssuer ? 'Adding Issuer...' : 'Add Issuer'}
              </Button>
            </div>
          </Card>

          {/* Authorized Issuers List */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Authorized Issuers ({authorizedIssuers.length})
            </h2>
            
            <div className="space-y-3">
              {authorizedIssuers.map((address, index) => (
                <div 
                  key={address} 
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-mono text-sm">{address}</p>
                    <p className="text-xs text-muted-foreground">
                      Authorized {index === authorizedIssuers.length - 1 ? 'just now' : `${index + 1} days ago`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Active</span>
                  </div>
                </div>
              ))}
              
              {authorizedIssuers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No authorized issuers yet</p>
                  <p className="text-sm">Add the first issuer to get started</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{authorizedIssuers.length}</div>
            <div className="text-sm text-muted-foreground">Total Issuers</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">24</div>
            <div className="text-sm text-muted-foreground">Credentials Issued</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-accent">12</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </Card>
        </div>
      </div>
    </div>
  );
}