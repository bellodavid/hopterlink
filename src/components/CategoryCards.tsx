"use client";
import React from "react";
import CategoriesSkeletonLoader from "./CategoriesSkeletonLoader";
import Typography from "./ui/typography";
import { useCategories } from "@/contexts/ReUsableData";
import Link from "next/link";
import Icon from "./Icon";
import { motion } from "framer-motion";

const CategoryCards = () => {
  const { categories, loading } = useCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Gradient patterns for different cards
  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-teal-500 to-cyan-500",
    "from-amber-500 to-orange-500"
  ];

  return (
    <div className="w-full px-4">
      {loading ? (
        <CategoriesSkeletonLoader />
      ) : categories && categories.length ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="h-full"
            >
              <Link href={`/categories/${category.id}`} className="h-full block">
                <motion.div
                  className="group relative h-[150px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg 
                           transition-all duration-300 bg-gradient-to-br from-neutral-100 to-neutral-200 
                           dark:from-neutral-800 dark:to-neutral-900"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Base gradient overlay - visible by default */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity 
                                 duration-300 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
                  
                  {/* Mesh gradient overlay for texture */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity 
                                duration-300 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] 
                                from-white via-transparent to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 p-4">
                    <motion.div
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm 
                               transition-colors duration-300 group-hover:text-white"
                    >
                      <Icon 
                        name={category.icon as string} 
                        size={26}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                    
                    <div className="text-center transition-colors duration-300 group-hover:text-white">
                      <Typography
                        variant="p"
                        className="leading-1 tracking-tighter max-lg:text-xs"
                      >
                        {category.name}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="w-full p-8 text-center">
          <Typography variant="h5" className="text-neutral-500">
            No categories found
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CategoryCards;