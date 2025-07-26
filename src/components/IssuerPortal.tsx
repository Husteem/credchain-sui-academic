import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, GraduationCap, Send, FileUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IssuerPortalProps {
  onBack: () => void;
  walletAddress: string;
}

export function IssuerPortal({ onBack, walletAddress }: IssuerPortalProps) {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [courseName, setCourseName] = useState('');
  const [metadata, setMetadata] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issuingCredential, setIssuingCredential] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true); // Simulate authorization check
  const [userWalletAddress, setUserWalletAddress] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (walletAddress) {
       // Connection successful
      console.log('Wallet connected:', walletAddress);
      setUserWalletAddress(walletAddress);
    }
    
    }, [walletAddress]);
  const handleIssueCredential = async () => {
    if (!recipientAddress || !courseName) return;
    
    setIssuingCredential(true);
    try {
      // Simulate credential issuance
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Credential Issued Successfully",
        description: `Certificate for "${courseName}" has been issued to ${recipientAddress.slice(0, 10)}...`,
      });
      
      // Reset form
      setRecipientAddress('');
      setCourseName('');
      setMetadata('');
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Issuance Failed", 
        description: "Failed to issue credential. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIssuingCredential(false);
    }
  };

  const recentCredentials = [
    {
      recipient: '0x7890abcdef1234567890abcdef1234567890abcd',
      course: 'Advanced Blockchain Development',
      issuedAt: '2 hours ago'
    },
    {
      recipient: '0x4567890abcdef1234567890abcdef1234567890',
      course: 'Smart Contract Security',
      issuedAt: '1 day ago'
    },
    {
      recipient: '0xdef1234567890abcdef1234567890abcdef123',
      course: 'DeFi Fundamentals',
      issuedAt: '3 days ago'
    }
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" className="mb-6" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <Card className="p-8 text-center shadow-elegant">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">Unauthorized Issuer</h2>
            <p className="text-muted-foreground mb-4">
              Your wallet address is not authorized to issue credentials. 
              Please contact an administrator to get authorized.
            </p>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded font-mono break-all">
              {walletAddress}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-secondary/80 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Issuer Portal</h1>
              <p className="text-muted-foreground">Issue academic credentials</p>
            </div>
          </div>
          
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issuer Wallet</p>
                <p className="font-mono text-sm">{walletAddress}</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Authorized</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Issue New Credential */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Issue New Credential
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <div>
                <Label htmlFor="course">Course Name</Label>
                <Input
                  id="course"
                  placeholder="e.g., Advanced Blockchain Development"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="metadata">Additional Metadata (Optional)</Label>
                <Textarea
                  id="metadata"
                  placeholder="Grade, completion date, additional notes..."
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <FileUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload certificate or transcript (Optional)
                </p>
                {selectedFile && (
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {selectedFile.name}
                  </p>
                )}
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  {selectedFile ? 'Change File' : 'Choose File'}
                </Button>
              </div>
              
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleIssueCredential}
                disabled={!recipientAddress || !courseName || issuingCredential}
              >
                {issuingCredential ? 'Issuing Credential...' : 'Issue Credential'}
              </Button>
            </div>
          </Card>

          {/* Recent Credentials */}
          <Card className="p-6 shadow-elegant animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl font-semibold mb-4">Recent Credentials</h2>
            
            <div className="space-y-3">
              {recentCredentials.map((credential, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted rounded-lg border border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{credential.course}</h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        To: {credential.recipient.slice(0, 20)}...
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {credential.issuedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-sm text-muted-foreground">Total Issued</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">12</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-accent">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
        </div>
      </div>
    </div>
  );
}