"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Share2Icon,
  Shield,
  Waves,
  Star,
  Users,
  Clock,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Zap,
  Heart,
  Trophy,
  MessageCircle,
  Target,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { StarsBackground } from "@/components/magicui/stars-background";
import { ShootingStars } from "@/components/magicui/shooting-stars";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import HeaderContainer from "@/components/HeaderContainer";
import SearchComponent from "@/components/SearchComponent";
import AppStores from "@/components/AppStores";
import CategoryCards from "@/components/CategoryCards";
import Cards from "@/components/Cards";
import MediaSection from "@/components/MediaSection";
import FullScreenMedia from "@/components/FullScreenMedia";

export default function Home() {
  const [activeTab, setActiveTab] = useState("features");

  const projects = [
    {
      title: "Multi Spectrum Services",
      description:
        "From everyday essentials to specialized expertise, our platform unifies service delivery for both consumers and providers.",
      icon: <Share2Icon className="text-blue-500 w-6 h-6" />,
    },
    {
      title: "Smart Matching",
      description:
        "AI-powered matching system connects you with the perfect service provider based on your specific needs and preferences.",
      icon: <Target className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, secure payments, and comprehensive provider verification keep your data and transactions safe.",
      icon: <Shield className="text-purple-500 w-6 h-6" />,
    },
  ];

  const stats = [
    {
      label: "Active Providers",
      value: "2,000+",
      icon: <Users className="text-blue-500" />,
      description: "Verified professionals ready to help",
    },
    {
      label: "Customer Rating",
      value: "4.8/5",
      icon: <Star className="text-yellow-500" />,
      description: "Based on 50,000+ reviews",
    },
    {
      label: "Response Time",
      value: "< 2hrs",
      icon: <Clock className="text-green-500" />,
      description: "Average provider response time",
    },
  ];

  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      title: "Verified Providers",
      description: "Every provider undergoes thorough background checks",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Instant Booking",
      description: "Schedule services with just a few clicks",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Satisfaction Guaranteed",
      description: "100% money-back guarantee if you're not satisfied",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      title: "24/7 Support",
      description: "Our team is always here to help you",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "Found an amazing electrician within minutes. The whole process was seamless!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      content:
        "This platform has transformed how we handle facility maintenance. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Property Manager",
      content:
        "The quality of service providers is outstanding. Never had a bad experience.",
      rating: 5,
    },
  ];

  const words = ["Find", "Review", "Hire"];

  return (
    <HeaderContainer>
      <div className="relative w-full overflow-hidden">
        {/* Hero Section */}
        <div className="flex flex-col min-h-screen relative mt-16">
          <div className="absolute inset-0">
            <StarsBackground />
            <ShootingStars />
          </div>

          <div className="container mx-auto px-4 py-12 relative z-10">
            {/* Announcement Banner */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100/90 backdrop-blur-sm",
                  "hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900/90",
                  "dark:hover:bg-neutral-800 transition-all cursor-pointer"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2">
                  <Badge variant="default" className="mr-2">
                    New
                  </Badge>
                  <span className="mr-2">✨ Introducing Smart Matching</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </AnimatedShinyText>
              </motion.div>
            </div>

            {/* Hero Content */}

            <div className="flex flex-col lg:flex-row gap-12 items-center pt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    <FlipWords words={words} />
                    <span className="text-[#c55e0c] dark:text-white block">
                      Service Experts
                    </span>
                  </h1>
                  <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-xl">
                    Your One-Stop Platform for Professional Services. Quality,
                    Trust, and Convenience.
                  </p>
                </div>

                <SearchComponent />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all"
                    >
                      {stat.icon}
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-neutral-500">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <AppStores />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex justify-center"
              >
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c55e0c]/20 to-purple-500/20 rounded-3xl blur-3xl" />
                  <Card className="relative bg-neutral-900/70 backdrop-blur-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        Featured Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all"
                        >
                          {feature.icon}
                          <div>
                            <h3 className="font-semibold text-white">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-neutral-200">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <section className="bg-neutral-50 dark:bg-neutral-900 py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Typography className="text-[#c55e0c]" variant="h1">
                  Our Vision
                </Typography>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Revolutionizing service delivery through innovation, trust,
                  and community
                </p>
              </motion.div>
              <div className="w-full max-w-6xl mx-auto">
                <HoverEffect items={projects} />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-neutral-100 dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <div className="text-center space-y-4">
                <Typography className="text-[#c55e0c]" variant="h1">
                  Customer Stories
                </Typography>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Real experiences from our community
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-500 text-yellow-500"
                            />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                          "{testimonial.content}"
                        </p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-neutral-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Typography className="text-[#c55e0c]" variant="h1">
                  Recent Activity
                </Typography>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Stay updated with the latest from our community
                </p>
              </motion.div>
              <Cards />
            </div>
          </div>
        </section>

        <Separator className="max-w-6xl mx-auto" />

        {/* Categories Section */}

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Typography className="text-[#c55e0c]" variant="h1">
                  Service Categories
                </Typography>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                      Find the perfect service for your needs
                    </p>
              </motion.div>
              <CategoryCards />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#c55e0c] to-purple-600">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-8 text-center text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl max-w-2xl"
              >
                Join thousands of satisfied customers who found their perfect
                service provider
              </motion.p>
              {/* <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-[#c55e0c] hover:bg-neutral-100"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </motion.div> */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Typography className="text-[#c55e0c]" variant="h1">
                  How It Works
                </Typography>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Your journey to finding the perfect service provider
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: "Search & Compare",
                    description:
                      "Browse through our verified providers and compare their services, ratings, and prices.",
                    icon: <Target className="w-8 h-8 text-[#c55e0c]" />,
                  },
                  {
                    step: 2,
                    title: "Book Instantly",
                    description:
                      "Schedule your service with just a few clicks. Choose your preferred time and date.",
                    icon: <Clock className="w-8 h-8 text-[#c55e0c]" />,
                  },
                  {
                    step: 3,
                    title: "Get Served",
                    description:
                      "Receive professional service and pay securely through our platform.",
                    icon: <CheckCircle2 className="w-8 h-8 text-[#c55e0c]" />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card className="h-full bg-neutral-50 dark:bg-neutral-900 border-none">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="bg-[#c55e0c]/10 p-3 rounded-lg">
                            {item.icon}
                          </div>
                          <Badge variant="outline" className="text-[#c55e0c]">
                            Step {item.step}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mt-4">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8">
                        <ArrowRight className="w-8 h-8 text-[#c55e0c]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Typography className="text-[#c55e0c]" variant="h1">
                  Why Trust Us
                </Typography>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Our commitment to quality and security
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Verified Providers",
                    description:
                      "Rigorous background checks and qualification verification",
                    icon: <Shield className="w-6 h-6 text-[#c55e0c]" />,
                  },
                  {
                    title: "Secure Payments",
                    description: "Protected transactions with escrow service",
                    icon: <Zap className="w-6 h-6 text-[#c55e0c]" />,
                  },
                  {
                    title: "Quality Guarantee",
                    description: "100% satisfaction or your money back",
                    icon: <Trophy className="w-6 h-6 text-[#c55e0c]" />,
                  },
                  {
                    title: "24/7 Support",
                    description: "Always here when you need us",
                    icon: <MessageCircle className="w-6 h-6 text-[#c55e0c]" />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border-none bg-white dark:bg-neutral-800">
                      <CardHeader>
                        <div className="bg-[#c55e0c]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                          {item.icon}
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </HeaderContainer>
  );
}
