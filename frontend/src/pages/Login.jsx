import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - just call onLogin
    onLogin();
  };
  
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md px-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">behive</h1>
          <p className="text-foreground-muted">AI-powered business platform</p>
        </div>
        
        <div className="bg-surface p-8 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="marco@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            
            <Button type="submit" variant="premium" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
          
          <p className="text-xs text-foreground-subtle text-center mt-6">
            Demo credentials: Any email/password combination will work
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
