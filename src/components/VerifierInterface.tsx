import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileCheck, Search, CheckCircle, XCircle, AlertTriangle, Calendar, User, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerifierInterfaceProps {
  onBack: () => void;
  walletAddress: string;
}

interface VerificationResult {
  isValid: boolean;
  credential?: {
    course: string;
    recipient: string;
    issuer: string;
    issuedAt: string;
    metadataUrl: string;
    status: 'active' | 'revoked';
  };
  error?: string;
}

export function VerifierInterface({ onBack, walletAddress }: VerifierInterfaceProps) {
  const [credentialId, setCredentialId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);
  

  useEffect(() => {
    if (walletAddress) {
      // Connection successful
      console.log('Wallet connected:', walletAddress);
      setUserWalletAddress(walletAddress);
      }
    }, [walletAddress]);

  const handleVerify = async () => {
    if (!credentialId) return;
    
    setIsVerifying(true);
    setVerificationResult(null);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification result
      const isValid = Math.random() > 0.3; // 70% chance of valid credential
      
      if (isValid) {
        setVerificationResult({
          isValid: true,
          credential: {
            course: 'Advanced Blockchain Development',
            recipient: '0x7890abcdef1234567890abcdef1234567890abcd',
            issuer: '0x1234567890abcdef1234567890abcdef12345678',
            issuedAt: '2024-01-15',
            metadataUrl: 'ipfs://QmX1Y2Z3...',
            status: 'active'
          }
        });
        
        toast({
          title: "Credential Verified",
          description: "The credential is authentic and valid",
        });
      } else {
        setVerificationResult({
          isValid: false,
          error: "Credential not found or invalid"
        });
        
        toast({
          title: "Verification Failed",
          description: "Could not verify the credential",
          variant: "destructive",
        });
      }
    } catch (error) {
      setVerificationResult({
        isValid: false,
        error: "Verification error occurred"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const recentVerifications = [
    {
      id: '1',
      course: 'Smart Contract Security',
      timestamp: '2 minutes ago',
      status: 'verified' as const
    },
    {
      id: '2', 
      course: 'DeFi Fundamentals',
      timestamp: '15 minutes ago',
      status: 'verified' as const
    },
    {
      id: '3',
      course: 'Unknown Credential',
      timestamp: '1 hour ago',
      status: 'failed' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-card rounded-full flex items-center justify-center border border-border">
              <FileCheck className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Verifier Interface</h1>
              <p className="text-muted-foreground">Verify credential authenticity</p>
            </div>
          </div>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verifier Wallet</p>
                <p className="font-mono text-sm">{walletAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Verifications Today</p>
                <p className="text-lg font-semibold">7</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Form */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Verify Credential
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="credentialId">Credential ID or Share Link</Label>
                <Input
                  id="credentialId"
                  placeholder="Enter credential ID or paste share link..."
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                />
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileCheck className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Or scan QR code from credential
                </p>
                <Button variant="outline" size="sm">
                  Open Camera
                </Button>
              </div>
              
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleVerify}
                disabled={!credentialId || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Credential'}
              </Button>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <Card className={`mt-6 p-4 ${
                verificationResult.isValid 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start gap-3">
                  {verificationResult.isValid ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-1" />
                  )}
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {verificationResult.isValid ? 'Credential Verified' : 'Verification Failed'}
                    </h3>
                    
                    {verificationResult.isValid && verificationResult.credential ? (
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-medium">{verificationResult.credential.course}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="font-mono text-xs">
                            {verificationResult.credential.recipient.slice(0, 20)}...
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Issued: {verificationResult.credential.issuedAt}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span>Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            verificationResult.credential.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {verificationResult.credential.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-700 text-sm mt-1">
                        {verificationResult.error}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </Card>

          {/* Recent Verifications */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>
            
            <div className="space-y-3">
              {recentVerifications.map((verification, index) => (
                <div 
                  key={verification.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {verification.status === 'verified' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{verification.course}</p>
                      <p className="text-xs text-muted-foreground">
                        {verification.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    verification.status === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {verification.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">Verification Tips</h4>
                  <ul className="text-xs text-blue-700 mt-1 space-y-1">
                    <li>• Always verify issuer authenticity</li>
                    <li>• Check credential status (active/revoked)</li>
                    <li>• Validate metadata integrity</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">47</div>
            <div className="text-sm text-muted-foreground">Total Verifications</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">42</div>
            <div className="text-sm text-muted-foreground">Successful</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-accent">89%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
        </div>
      </div>
    </div>
  );
}