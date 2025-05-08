"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CalendarCheck } from "lucide-react";

type MeetingType = "Discovery Call" | "Project Consultation" | "Website Audit" | "Custom Request";
type TimeSlot = "9:00 AM" | "10:00 AM" | "11:00 AM" | "1:00 PM" | "2:00 PM" | "3:00 PM" | "4:00 PM";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  meetingType: MeetingType;
  date: string;
  timeSlot: TimeSlot;
  message?: string;
};

export default function ScheduleMeeting() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const meetingTypes: MeetingType[] = [
    "Discovery Call", 
    "Project Consultation", 
    "Website Audit", 
    "Custom Request"
  ];
  
  const timeSlots: TimeSlot[] = [
    "9:00 AM", 
    "10:00 AM", 
    "11:00 AM", 
    "1:00 PM", 
    "2:00 PM", 
    "3:00 PM", 
    "4:00 PM"
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Call the API endpoint
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to schedule meeting');
      }
      
      console.log("Meeting scheduled:", result);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to schedule meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Schedule a Meeting</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Book a time to discuss your project needs with our expert team. We&apos;re here to help bring your digital vision to life.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg text-center"
          >
            <div className="flex justify-center mb-4">
              <CalendarCheck size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Meeting Scheduled!</h2>
            <p className="mb-6">Thank you for scheduling a meeting with us. We&apos;ve sent a confirmation to your email with all the details.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
              >
                Schedule Another Meeting
              </button>
              <a 
                href="/voice-call" 
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-opacity flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                Talk to Voice Agent Now
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-black/20 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            {submitError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md mb-4">
                {submitError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <User size={16} />
                  Your Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="Yash Siwach"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="you@example.com"
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone size={16} />
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="+91 1234567890"
                  type="tel"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  Company Name (Optional)
                </label>
                <input
                  {...register("company")}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="Your Company"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                Meeting Type
              </label>
              <select
                {...register("meetingType", { required: "Please select a meeting type" })}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
              >
                <option value="">Select meeting type</option>
                {meetingTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.meetingType && <p className="text-red-500 text-sm">{errors.meetingType.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar size={16} />
                  Preferred Date
                </label>
                <input
                  {...register("date", { required: "Date is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock size={16} />
                  Preferred Time
                </label>
                <select
                  {...register("timeSlot", { required: "Time slot is required" })}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.timeSlot && <p className="text-red-500 text-sm">{errors.timeSlot.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare size={16} />
                Additional Information (Optional)
              </label>
              <textarea
                {...register("message")}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent min-h-[100px]"
                placeholder="Tell us about your project or any specific questions you have..."
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    Processing...
                  </>
                ) : (
                  "Schedule Meeting"
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </main>
  );
}
