/**
 * File: app/contact/page.tsx
 * Purpose: Renders the contact page with a contact form, team section, and testimonials.
 * Author: Alejo Cagliolo
 * Date: 5/25/25
 * Version: 1.0.0
 */

"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../Navbar"
import Footer from "../Footer"

/**
 * Input Component
 * A reusable input field component with error handling and styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.error - Error message to display
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref
 * @returns {JSX.Element} Input field with error handling
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { error?: string }>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={`w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e6537] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)
Input.displayName = "Input"

/**
 * Textarea Component
 * A reusable textarea component with error handling and styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.error - Error message to display
 * @param {React.Ref<HTMLTextAreaElement>} ref - Forwarded ref
 * @returns {JSX.Element} Textarea with error handling
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }
>(({ className, error, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        className={`w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e6537] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
})
Textarea.displayName = "Textarea"

/**
 * Button Component
 * A reusable button component with variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {"default" | "outline"} props.variant - Button style variant
 * @param {"default" | "sm" | "lg"} props.size - Button size
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * @returns {JSX.Element} Styled button
 */
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e6537] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-gradient-to-r from-[#0a5a2f] to-[#157a42] text-white hover:from-[#0e6537] hover:to-[#157a42]",
    outline: "border border-[#0e6537] bg-transparent text-[#0e6537] hover:bg-[#0e6537]/5",
  }

  const sizes = {
    default: "h-10 py-2 px-4 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
  }

  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} ref={ref} {...props} />
})
Button.displayName = "Button"

/**
 * Icons Collection
 * A collection of SVG icons used throughout the contact page
 * Each icon is a React component that accepts standard SVG props
 */
const Icons = {
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Clock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Send: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  CheckCircle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Zap: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Target: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Quote: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  ),
}

/**
 * TeamSection Component
 * Displays team members with their roles and co-founder status
 * 
 * @returns {JSX.Element} Team section with member cards
 */
function TeamSection() {
  const teamMembers = [
    {
      name: "Anay Pant",
      role: "Chief Excutive Officer",
      isCoFounder: true,
    },
    {
      name: "Siddarth Nuthi",
      role: "Chief Technology Officer",
      isCoFounder: true,
    },
    {
      name: "Alejo Cagliolo",
      role: "Chief Product Officer",
    },
    {
      name: "Utsav Arora",
      role: "Chief Software Officer",
    },
    {
      name: "Parshawn Haynes",
      role: "Chief Marketing Officer",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white p-8 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Meet Our Team</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
        <p className="mt-4 text-gray-600">
          Our dedicated team of professionals is committed to providing exceptional service and innovative solutions.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#e6f5ec] to-[#f0f9f4]">
              {member.isCoFounder && (
                <span className="rounded-full bg-[#0e6537] px-3 py-1 text-xs font-medium text-white">Co-Founder</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-[#d8eee1] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#0e6537]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#002417]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white bg-transparent text-white hover:bg-white hover:text-green-800"
                >
                  <Icons.Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="mb-1 text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm font-medium text-[#0e6537]">{member.role}</p>
              {member.isCoFounder && (
                <div className="mt-2 hidden md:block">
                  <span className="inline-block rounded-full bg-[#e6f5ec] px-3 py-1 text-xs font-medium text-[#002417]">
                    Co-Founder
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * TestimonialsSection Component
 * Displays client testimonials with ratings and quotes
 * 
 * @returns {JSX.Element} Testimonials section with client feedback
 */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "ACS transformed our operations with their innovative solutions. Their team was responsive, professional, and delivered beyond our expectations.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "TechVision Inc.",
    },
    {
      quote:
        "Working with ACS has been a game-changer for our business. Their expertise and dedication to our success made all the difference.",
      author: "Michael Chen",
      position: "Operations Director",
      company: "Global Systems",
    },
    {
      quote:
        "The team at ACS provided exceptional service from start to finish. Their attention to detail and commitment to quality is unmatched.",
      author: "Emily Rodriguez",
      position: "CEO",
      company: "Innovate Partners",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-white p-8 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What Our Clients Say</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
        <p className="mt-4 text-gray-600">
          Don't just take our word for it. Here's what our clients have to say about working with ACS:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg border border-gray-100 bg-gradient-to-br from-white to-[#f0f9f4] p-6 shadow-sm"
            variants={itemVariants}
          >
            <div className="absolute -top-3 -left-3 rounded-full bg-[#0e6537] p-2 text-white">
              <Icons.Quote className="h-4 w-4" />
            </div>
            <p className="mb-4 italic text-gray-600">"{testimonial.quote}"</p>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-800">{testimonial.author}</p>
              <p className="text-sm text-gray-600">
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * ContactPage Component
 * Main contact page component with form handling and validation
 * 
 * @returns {JSX.Element} Complete contact page with form, team, and testimonials
 */
export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    isDemoRequest: false,
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);

  const validateForm = () => {
    let valid = true
    const errors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    }

    if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters"
      valid = false
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Please enter a valid email address"
      valid = false
    }

    if (formData.subject.length < 5) {
      errors.subject = "Subject must be at least 5 characters"
      valid = false
    }

    if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target
    const checked = 'checked' in e.target ? e.target.checked : false
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    
    // If demo request is checked, update the message
    if (name === 'isDemoRequest' && checked) {
      setFormData(prev => ({
        ...prev,
        subject: "Demo Request",
        message: "Hello, I am interested in a demo of your AI-powered real estate platform. I would like to learn more about how it can help my business. Please provide more information about scheduling a demo session."
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess(false);
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsSubmitted(true);
          setApiSuccess(true);
        } else {
          const data = await res.json();
          setApiError(data.error || "Failed to send message.");
        }
      } catch (err) {
        setApiError("Failed to send message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#e6f5ec] via-[#f0f9f4] to-white">
      <Navbar/>
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient circles */}
        <div className="absolute -top-[15%] -right-[15%] h-[50%] w-[50%] rounded-full bg-[#0e6537]/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] h-[40%] w-[40%] rounded-full bg-[#0a5a2f]/5 blur-3xl" />
        <div className="absolute -bottom-[10%] right-[20%] h-[30%] w-[30%] rounded-full bg-[#157a42]/5 blur-3xl" />

        {/* Add a subtle dot pattern instead */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#0e6537 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10">
        <motion.div
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <h1 className="mb-3 text-5xl font-bold tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-[#0a5a2f] to-[#157a42] bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-gray-700">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl">
            {/* Contact Form and Information */}
            <div className="grid gap-8 md:grid-cols-12">
              {/* Contact Information */}
              <motion.div className="md:col-span-5 lg:col-span-4" variants={itemVariants}>
                <div className="rounded-xl bg-white p-8 shadow-lg">
                  <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Get in Touch</h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
                  </div>

                  <div className="space-y-6">
                    {/* <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#f0f9f4] p-3 text-[#0e6537]">
                        <Icons.MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Our Location</h3>
                        <p className="mt-1 text-gray-600">
                          123 Business Avenue, Suite 500
                          <br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#f0f9f4] p-3 text-[#0e6537]">
                        <Icons.Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Phone Number</h3>
                        <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div> */}

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#f0f9f4] p-3 text-[#0e6537]">
                        <Icons.Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Email Address</h3>
                        <p className="mt-1 text-gray-600">support@automatedconsultancy.com</p>
                      </div>
                    </div>

                    {/* <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#f0f9f4] p-3 text-[#0e6537]">
                        <Icons.Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">Business Hours</h3>
                        <p className="mt-1 text-gray-600">
                          Monday - Friday: 8am - 6pm
                          <br />
                          Saturday: 10am - 4pm
                        </p>
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center">
                    <h3 className="mb-4 text-lg font-bold text-gray-800 tracking-tight">Connect With Us</h3>
                    <a
                      href="https://www.linkedin.com/company/automated-consultancy-services/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#0e6537] to-[#157a42] text-white rounded-full font-semibold shadow-lg hover:from-[#157a42] hover:to-[#0e6537] transition-all text-lg mt-2"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                      </svg>
                      <span>Follow us on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div className="md:col-span-7 lg:col-span-8" variants={itemVariants}>
                <div className="rounded-xl bg-white p-8 shadow-lg">
                  {isSubmitted ? (
                    <motion.div
                      className="flex h-full flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-6 rounded-full bg-[#f0f9f4] p-4">
                        <Icons.CheckCircle className="h-12 w-12 text-[#0e6537]" />
                      </div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-800">Message Sent Successfully!</h2>
                      <p className="mb-8 max-w-md text-gray-600">
                        Thank you for reaching out to us. We've received your message and will get back to you as soon as
                        possible.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Send Us a Message</h2>
                        <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
                        <p className="mt-4 text-gray-600">
                          Fill out the form below, and we'll be in touch as soon as possible.
                        </p>
                      </div>

                      {apiError && <div className="text-red-600 font-semibold mb-4">{apiError}</div>}
                      {apiSuccess && <div className="text-green-700 font-semibold mb-4">Message sent successfully!</div>}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                              Full Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              error={formErrors.name}
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              error={formErrors.email}
                            />
                          </div>
                        </div>

                        {/* Demo Request Section */}
                        <motion.div 
                          className="relative rounded-xl border-2 border-dashed border-[#0e6537]/20 bg-[#f0f9f4]/50 p-6 transition-all duration-300"
                          whileHover={{ scale: 1.01, borderColor: "#0e6537/40" }}
                          animate={{ 
                            borderColor: formData.isDemoRequest ? "#0e6537" : "#0e6537/20",
                            backgroundColor: formData.isDemoRequest ? "#f0f9f4" : "#f0f9f4/50"
                          }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <motion.div
                                className="relative h-6 w-6"
                                animate={{ scale: formData.isDemoRequest ? 1 : 0.9 }}
                              >
                                <input
                                  type="checkbox"
                                  id="isDemoRequest"
                                  name="isDemoRequest"
                                  checked={formData.isDemoRequest}
                                  onChange={handleChange}
                                  className="peer absolute inset-0 h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-[#0e6537] bg-white transition-all checked:border-[#0e6537] checked:bg-[#0e6537] hover:border-[#157a42] focus:outline-none focus:ring-2 focus:ring-[#0e6537] focus:ring-offset-2"
                                />
                                <motion.svg
                                  className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  initial={false}
                                  animate={{ 
                                    opacity: formData.isDemoRequest ? 1 : 0,
                                    scale: formData.isDemoRequest ? 1 : 0.5
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </motion.svg>
                              </motion.div>
                            </div>
                            <div className="flex-1">
                              <label
                                htmlFor="isDemoRequest"
                                className="block text-lg font-semibold text-[#0e6537] cursor-pointer"
                              >
                                Request a Live Demo
                              </label>
                              <p className="mt-1 text-sm text-gray-600">
                                Experience our AI-powered real estate platform firsthand. We'll show you how it can transform your business.
                              </p>
                              <AnimatePresence>
                                {formData.isDemoRequest && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-3 rounded-lg bg-white/80 p-3 text-sm text-gray-600"
                                  >
                                    <p className="flex items-center gap-2">
                                      <svg className="h-4 w-4 text-[#0e6537]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      We'll customize the demo to your specific needs and schedule it at your convenience.
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>

                        <div>
                          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="How can we help you?"
                            value={formData.subject}
                            onChange={handleChange}
                            error={formErrors.subject}
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                            Message
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Please provide details about your inquiry..."
                            className="min-h-32"
                            value={formData.message}
                            onChange={handleChange}
                            error={formErrors.message}
                          />
                        </div>
                        <div className="pt-2">
                          <Button
                            type="submit"
                            className="w-full transition-all duration-300 ease-in-out"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                Send Message <Icons.Send className="h-4 w-4" />
                              </span>
                            )}
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Meet the Team Section */}
            <motion.div className="mt-8" variants={itemVariants}>
              <TeamSection />
            </motion.div>

            {/* Testimonials Section - Commented out
            <motion.div className="mt-8" variants={itemVariants}>
              <TestimonialsSection />
            </motion.div>
            */}

            {/* Why Choose Us Section - Commented out
            <motion.div className="mt-8 overflow-hidden rounded-xl bg-white p-8 shadow-lg" variants={itemVariants}>
              <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Why Choose Us</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
                <p className="mt-4 text-gray-600">
                  At ACS, we're committed to excellence in everything we do. Here's what sets us apart:
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: "Users",
                    title: "Dedicated Support",
                    description:
                      "Our team of specialists provides personalized attention and responsive support for all your needs.",
                  },
                  {
                    icon: "Zap",
                    title: "Innovative Solutions",
                    description:
                      "We leverage cutting-edge technology to deliver forward-thinking solutions that drive results.",
                  },
                  {
                    icon: "Target",
                    title: "Results-Driven",
                    description: "We focus on measurable outcomes that align with your business goals and objectives.",
                  },
                  {
                    icon: "Clock",
                    title: "Timely Delivery",
                    description: "We understand the importance of deadlines and consistently deliver projects on time.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col rounded-lg border border-gray-100 p-6 transition-all hover:border-[#0e6537]/20 hover:shadow-md"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="mb-4 rounded-full bg-[#f0f9f4] p-3 w-12 h-12 flex items-center justify-center text-[#0e6537]">
                      {benefit.icon === "Users" && <Icons.Users className="h-5 w-5" />}
                      {benefit.icon === "Zap" && <Icons.Zap className="h-5 w-5" />}
                      {benefit.icon === "Target" && <Icons.Target className="h-5 w-5" />}
                      {benefit.icon === "Clock" && <Icons.Clock className="h-5 w-5" />}
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            */}

            {/* FAQ Section */}
            <motion.div className="mt-8 overflow-hidden rounded-xl bg-white p-8 shadow-lg" variants={itemVariants}>
              <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#0a5a2f] to-[#157a42]"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    q: "What services does ACS provide?",
                    a: "ACS offers a comprehensive range of services including consulting, implementation, and support for businesses of all sizes.",
                  },
                  {
                    q: "How quickly can I expect a response?",
                    a: "We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our support line.",
                  },
                  {
                    q: "Do you offer virtual consultations?",
                    a: "Yes, we offer both in-person and virtual consultations to accommodate your preferences and location.",
                  },
                  {
                    q: "What are your payment terms?",
                    a: "We offer flexible payment options including monthly retainers, project-based billing, and customized payment plans.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-100 p-6 transition-all hover:border-[#0e6537]/20 hover:shadow-sm"
                  >
                    <h3 className="mb-3 text-lg font-medium text-gray-800">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="relative z-20">
        <Footer/>
      </div>
    </div>
  )
}

/**
 * Change Log:
 * 5/25/25 - Initial version
 * - Created contact page with form validation
 * - Added team section with member cards
 * - Implemented testimonials section
 * - Added reusable form components (Input, Textarea, Button)
 * - Integrated SVG icons collection
 */
