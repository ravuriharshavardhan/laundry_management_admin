"use client";

import React, { useState } from "react";
import { IoSettingsOutline, IoNotifications } from "react-icons/io5"; // Io5 for settings & notifications
import { IoMdClose } from "react-icons/io"; // Io for Close icon
import { FaUser, FaLanguage, FaSave, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// Full Width Settings UI Component
export default function SettingsUI() {
  const [theme, setTheme] = useState("Light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deleted.");
  };

  return (
    <div className="container mx-auto p-6 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center flex justify-center items-center">
            <IoSettingsOutline className="mr-2 text-2xl" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Settings */}
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FaUser className="mr-2 text-lg" />
              User Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Change Password"
                className="w-full"
              />
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium flex items-center">
              <IoNotifications className="mr-2" />
              Notifications
            </h2>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={(checked) => setNotificationsEnabled(checked)}
            />
          </div>

          {/* Theme Settings */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium flex items-center">
              <FaLock className="mr-2" />
              Theme Settings
            </h2>
            <Select value={theme} onValueChange={setTheme} className="w-[200px]">
              <SelectTrigger>
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="Dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Settings */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium flex items-center">
              <FaLanguage className="mr-2" />
              Language Settings
            </h2>
            <Select value={language} onValueChange={setLanguage} className="w-[200px]">
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* General Settings */}
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-medium flex items-center">
              <IoMdClose className="mr-2" />
              General Settings
            </h2>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={(checked) => setNotificationsEnabled(checked)}
            />
          </div>

          {/* Save & Delete Actions */}
          <div className="flex justify-between mt-6 w-full">
            <Button variant="primary" onClick={handleSave} className="w-full sm:w-[48%]">
              <FaSave className="mr-2" />
              Save Settings
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} className="w-full sm:w-[48%]">
              <FaLock className="mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
