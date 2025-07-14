'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw, ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CheckEmailPage() {
  const [email, setEmail] = useState<string>('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string>('');
  const [countdown, setCountdown] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setMounted(true);
    // Get email from URL params or localStorage
    const emailParam = searchParams.get('email');
    const storedEmail = localStorage.getItem('signup-email');
    
    if (emailParam) {
      setEmail(emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to signup if no email found
      router.push('/signup');
    }
  }, [searchParams, router]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email || countdown > 0) return;
    
    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: 'dummy-password', // This won't be used for resend
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setResendSuccess(true);
      setCountdown(60); // 60 second cooldown
    } catch (error: any) {
      setResendError(error.message || 'Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  const getEmailProvider = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    const providers = {
      'gmail.com': { name: 'Gmail', url: 'https://gmail.com' },
      'outlook.com': { name: 'Outlook', url: 'https://outlook.com' },
      'hotmail.com': { name: 'Outlook', url: 'https://outlook.com' },
      'yahoo.com': { name: 'Yahoo', url: 'https://yahoo.com' },
      'icloud.com': { name: 'iCloud', url: 'https://icloud.com' },
    };
    return providers[domain as keyof typeof providers];
  };

  const emailProvider = getEmailProvider(email);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6"
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              Check your email
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground leading-relaxed"
            >
              We've sent a verification link to{' '}
              <span className="font-semibold text-foreground break-all">
                {email}
              </span>
            </motion.p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email Provider Button */}
            <AnimatePresence>
              {emailProvider && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <a
                      href={emailProvider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open {emailProvider.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-muted/50 rounded-lg p-4 border"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-2 text-foreground">Next steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Check your email inbox</li>
                    <li>Click the verification link</li>
                    <li>You'll be redirected to complete your account</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Resend Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {resendSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Verification email sent successfully!
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {resendError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{resendError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-sm text-muted-foreground text-center">
                Didn't receive the email?{' '}
                <Button
                  variant="link"
                  onClick={handleResendEmail}
                  disabled={isResending || countdown > 0}
                  className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                >
                  {isResending ? (
                    <motion.span
                      className="flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Sending...
                    </motion.span>
                  ) : countdown > 0 ? (
                    <motion.span
                      key={countdown}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Resend in {countdown}s
                    </motion.span>
                  ) : (
                    'Click to resend'
                  )}
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/login')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            If you continue to have problems, check your spam folder or{' '}
            <Button
              variant="link"
              asChild
              className="p-0 h-auto text-xs text-primary hover:text-primary/80"
            >
              <a href="mailto:support@yourapp.com">contact support</a>
            </Button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}