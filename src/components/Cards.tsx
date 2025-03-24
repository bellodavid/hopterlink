import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Star, Building2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import Typography from './ui/typography';
import AverageReview from './AverageReview';

const ActivityCarousel = () => {
  const [recent, setRecents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const router = useRouter();

  const itemsToShow = 3;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/recent-activity/');
        console.log('Activity data:', result.data); // Add this log
        setRecents(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  const truncateEmail = (email) => {
    const [name, domain] = email.split('@');
    if (name.length > 4) {
      return `${name.slice(0, 5)}***${name.slice(-3)}@${domain}`;
    }
    return email;
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % recent.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + recent.length) % recent.length);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % recent.length;
      items.push(recent[index]);
    }
    return items;
  };

  const renderContent = (activity) => {
    switch (activity?.activity_type) {
      case 'review':
        return (
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Badge className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Review
              </Badge>
              <Typography variant="h5" className="font-bold text-sm">
                {truncateEmail(activity?.content_object.user.email)}
              </Typography>
            </div>
            
            <div className="flex items-center gap-2">
              <AverageReview value={activity.content_object.rating} size={16} />
              <span className="text-sm text-neutral-500">
                {activity?.content_object?.rating.toFixed(1)}
              </span>
            </div>
            
            <Typography variant="p" className="text-sm leading-relaxed line-clamp-3">
              {activity?.content}
            </Typography>
          </motion.div>
        );

      case 'business':
        return (
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                New Business
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src={activity?.content_object.logo || activity?.content_object?.images[0]?.thumbnail}
                  fill
                  alt="Business Logo"
                  className="object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2">
                  <BadgeCheck className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div>
                <Typography variant="h5" className="font-bold">
                  {activity?.content_object?.business_name}
                </Typography>
                <Typography variant="p" className="text-sm text-neutral-500 line-clamp-2">
                  {activity?.content}
                </Typography>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 w-full px-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-[280px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full px-4">
      <div className="flex items-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.div>
        </button>

        <div className="overflow-hidden w-full">
          <motion.div className="flex gap-6">
            <AnimatePresence initial={false} custom={direction}>
              {getVisibleItems().map((activity, index) => (
                <motion.div
                  key={`${activity?.content_object.id}-${index}`}
                  className="w-full min-w-[calc(33.333% - 1rem)]"
                  initial={{ 
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1 
                  }}
                  exit={{ 
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0 
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-neutral-50 
                               dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 
                               dark:border-neutral-700 p-6 cursor-pointer h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12 rounded-xl border-2 border-white shadow-lg">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                          {activity?.user?.first_name?.[0] || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Typography variant="h6" className="font-semibold">
                          {activity?.user?.first_name ?? "Anonymous"} {activity?.user?.last_name ?? "User"}
                        </Typography>
                        <Typography variant="p" className="text-sm text-neutral-500">
                          {activity?.activity_type === "review" ? "Left a review" : "New business"}
                        </Typography>
                      </div>
                    </div>

                    {renderContent(activity)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.div>
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {recent.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-neutral-300 dark:bg-neutral-700'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityCarousel;