"use client";

import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaRegComments,
  FaSearch,
  FaLightbulb,
  FaPhone,
} from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HelpUI() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleContactSupport = () => {
    toast.success("Redirecting to support...");
  };

  const handleViewArticle = (articleTitle: string) => {
    toast.info(`Opening article: ${articleTitle}`);
  };

  const helpArticles = [
    {
      title: "How to reset your password",
      content: "Go to settings, then 'Security', and click 'Reset Password'.",
    },
    {
      title: "Troubleshooting login issues",
      content: "Ensure you're using the correct credentials and clear cookies.",
    },
    {
      title: "Understanding your dashboard",
      content: "The dashboard shows recent activity, metrics, and alerts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-semibold flex items-center">
          <IoMdHelpCircle className="text-blue-500 mr-2 text-2xl" />
          Help Center
        </h1>

        <div className="flex w-full sm:w-auto gap-2">
          <Input
            className="w-full sm:w-64"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button variant="default">
            <FaSearch className="mr-2 text-lg" />
            Search
          </Button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => handleViewArticle("FAQ")}
        >
          <FaQuestionCircle className="mr-2 text-lg" />
          FAQ
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => handleViewArticle("Contact Support")}
        >
          <FaPhone className="mr-2 text-lg" />
          Contact Support
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => handleViewArticle("Tips & Tricks")}
        >
          <FaLightbulb className="mr-2 text-lg" />
          Tips & Tricks
        </Button>
      </div>

      {/* Accordion Section */}
      <Accordion type="single" collapsible className="w-full">
        {helpArticles
          .filter((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((article, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left font-medium">
                {article.title}
              </AccordionTrigger>
              <AccordionContent>{article.content}</AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>

      {/* Footer Action */}
      <div className="mt-8 text-center">
        <Button onClick={handleContactSupport} className="text-white bg-blue-600 hover:bg-blue-700">
          <FaRegComments className="mr-2 text-lg" />
          Still need help? Contact us
        </Button>
      </div>
    </div>
  );
}
