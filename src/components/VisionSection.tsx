"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Typography from "@/components/ui/typography";

const VisionSection = ({ projects }) => {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  
  return (
    <div className="relative w-full py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Moving Image Layers */}
        <motion.div 
          className="absolute inset-0"
          style={{ y, rotate }}
        >
          <img
            src="https://img.freepik.com/free-vector/construction-workers-builder-engineer-foreman-characters-with-tools-blueprint-architect-with-house-plan-professional-architecture-building-constructors-helmets-cartoon-vector-illustration_107791-8470.jpg?semt=ais_incomin"
            alt="background"
            className="absolute w-[120%] h-[120%] object-cover opacity-5 scale-110 transform -rotate-6"
          />
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="flex flex-col gap-12 items-center relative">
        {/* Title with animated underline */}
        <motion.div 
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography className="relative text-5xl font-black" variant="h1">
            <span className="absolute -inset-2 blur-xl bg-orange-600/30 group-hover:bg-orange-600/40 transition-colors duration-500" />
            <span className="relative bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
              Our Vision
            </span>
          </Typography>
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-600 to-red-600 group-hover:w-full transition-all duration-700"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Content Container */}
        <motion.div 
          className="max-w-6xl mx-auto px-8 w-full relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glass Card Effect */}
          <div className="relative p-12 rounded-2xl overflow-hidden backdrop-blur-lg border border-white/20 shadow-2xl bg-white/10 dark:bg-gray-900/50">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 opacity-20">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <HoverEffect items={projects} />
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500/30 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500/30 rounded-br-xl" />
          </div>
        </motion.div>
      </div>

      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default VisionSection;