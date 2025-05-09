'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  setPassword,
  setFullname,
  setRole,
  setLoading,
} from '../../Redux/Slice/authSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setFullname(formData.fullname));
      dispatch(setEmail(formData.email));
      dispatch(setPassword(formData.password));
      dispatch(setRole(formData.role));
      dispatch(setLoading(false));

      console.log('Signup Data:', formData);
      alert('Account created successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </Label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <Button
            className="w-full py-3 font-medium text-base"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
