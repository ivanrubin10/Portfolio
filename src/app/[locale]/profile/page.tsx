'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mark this page as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

function ProfileContent() {
  const { user, isAuthenticated, loading: authLoading } = useAuthContext();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);
  
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const supabase = createClient();
          
          // Check if profiles table exists and fetch profile data
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') {
            // PGRST116 = no rows found, which is OK for new users
            throw error;
          }
          
          if (data) {
            setFullName(data.fullName || user.user_metadata?.name || '');
            setUsername(data.username || '');
          } else {
            // Set default values from auth metadata
            setFullName(user.user_metadata?.name || '');
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      };
      
      fetchProfile();
    }
  }, [user]);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }
    
    setError(null);
    setSuccessMessage(null);
    setUpdating(true);
    
    try {
      const supabase = createClient();
      
      // Update auth metadata
      const { error: updateAuthError } = await supabase.auth.updateUser({
        data: { name: fullName }
      });
      
      if (updateAuthError) {
        throw updateAuthError;
      }
      
      // Update or insert profile in profiles table
      const { error: updateProfileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          fullName,
          username: username || null,
          email: user.email,
          updated_at: new Date().toISOString(),
        });
      
      if (updateProfileError) {
        throw updateProfileError;
      }
      
      setSuccessMessage('Profile updated successfully');
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };
  
  const handleChangePassword = () => {
    router.push('/reset-password');
  };
  
  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null; // We'll redirect in useEffect
  }
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {successMessage}
                </h3>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                  disabled={updating}
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username (optional)
                </label>
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                  disabled={updating}
                />
              </div>
              
              <Button
                type="submit"
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          
          <Separator className="mb-4" />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-gray-500">Change your password</p>
            </div>
            <Button
              variant="outline"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
} 