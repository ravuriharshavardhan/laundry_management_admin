"use client"

import React, { useEffect, useState } from 'react';
import LoginScreen from './login/page';
import { useRouter } from 'next/navigation'; // For routing
import DashboardPage from './dashboard/page';


export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Simulating authentication check (you can use any auth logic)
  useEffect(() => {
    const user = localStorage.getItem("user"); // Replace this with your auth logic
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Redirect to another page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Change this to your target page
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show login screen
  return (
    <div>
      {isAuthenticated ? (
        <div>Loading...</div>
      ) : (
        <DashboardPage />
      )}
    </div>
  );
}
