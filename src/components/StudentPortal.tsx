import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Users, Share2, QrCode, ExternalLink, Award, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentPortalProps {
  onBack: () => void;
  walletAddress: string;
}

interface Credential {
  id: string;
  course: string;
  issuer: string;
  issuedAt: string;
  metadataUrl: string;
  status: 'active' | 'revoked';
}

export function StudentPortal({ onBack, walletAddress }: StudentPortalProps) {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const { toast } = useToast();

  const credentials: Credential[] = [
    {
      id: '1',
      course: 'Advanced Blockchain Development',
      issuer: '0x1234567890abcdef1234567890abcdef12345678',
      issuedAt: '2024-01-15',
      metadataUrl: 'ipfs://QmX1Y2Z3...',
      status: 'active'
    },
    {
      id: '2',
      course: 'Smart Contract Security',
      issuer: '0xabcdef1234567890abcdef1234567890abcdef12',
      issuedAt: '2024-02-20',
      metadataUrl: 'ipfs://QmA4B5C6...',
      status: 'active'
    },
    {
      id: '3',
      course: 'DeFi Fundamentals',
      issuer: '0x1234567890abcdef1234567890abcdef12345678',
      issuedAt: '2024-03-10',
      metadataUrl: 'ipfs://QmD7E8F9...',
      status: 'active'
    }
  ];

  const handleShareCredential = (credential: Credential) => {
    const shareUrl = `${window.location.origin}/verify?id=${credential.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share Link Copied",
      description: "Credential verification link copied to clipboard",
    });
  };

  const handleGenerateQR = (credential: Credential) => {
    setSelectedCredential(credential);
    toast({
      title: "QR Code Generated",
      description: "QR code created for credential sharing",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Student Portal</h1>
              <p className="text-muted-foreground">View and share your credentials</p>
            </div>
          </div>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Student Wallet</p>
                <p className="font-mono text-sm">{walletAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Credentials</p>
                <p className="text-lg font-semibold">{credentials.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credentials List */}
          <div className="lg:col-span-2 space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-semibold mb-4">Your Credentials</h2>
            
            {credentials.map((credential, index) => (
              <Card 
                key={credential.id} 
                className="p-6 shadow-card hover:shadow-elegant transition-all duration-300"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-accent" />
                      <h3 className="text-lg font-semibold">{credential.course}</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued: {credential.issuedAt}</span>
                      </div>
                      
                      <div>
                        <span className="block">Issuer:</span>
                        <span className="font-mono text-xs">
                          {credential.issuer.slice(0, 20)}...
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          credential.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {credential.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareCredential(credential)}
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateQR(credential)}
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Code
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => window.open(credential.metadataUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {credentials.length === 0 && (
              <Card className="p-12 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Credentials Yet</h3>
                <p className="text-muted-foreground">
                  Your credentials will appear here once they are issued by authorized institutions.
                </p>
              </Card>
            )}
          </div>

          {/* QR Code Display */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Card className="p-6 shadow-elegant sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Quick Share</h3>
              
              {selectedCredential ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">QR Code Preview</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">{selectedCredential.course}</h4>
                    <p className="text-xs text-muted-foreground">
                      Scan or share this QR code to verify the credential
                    </p>
                  </div>
                  
                  <Button 
                    variant="credential" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleShareCredential(selectedCredential)}
                  >
                    Copy Share Link
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Select a credential to generate QR code
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{credentials.length}</div>
            <div className="text-sm text-muted-foreground">Total Credentials</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">
              {credentials.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-accent">
              {new Set(credentials.map(c => c.issuer)).size}
            </div>
            <div className="text-sm text-muted-foreground">Institutions</div>
          </Card>
        </div>
      </div>
    </div>
  );
}