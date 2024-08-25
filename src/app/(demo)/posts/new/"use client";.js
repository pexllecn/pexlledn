"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const data = [
  {
    id: "1",
    category: "Productivity",
    title: "Task Manager",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80"
  },
  {
    id: "2",
    category: "Photo & Video",
    title: "Photo Editor",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
  },
  {
    id: "3",
    category: "Food & Drink",
    title: "Recipe Finder",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&q=80"
  },
  {
    id: "4",
    category: "Education",
    title: "Language Learner",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80"
  },
  {
    id: "5",
    category: "Lifestyle",
    title: "Meditation Guide",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&q=80"
  },
  {
    id: "6",
    category: "Entertainment",
    title: "Music Streamer",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80"
  }
];

export default function Component() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">App Store</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer rounded-2xl shadow-md overflow-hidden relative aspect-[3/4]"
          >
            <motion.img
              layoutId={`image-${item.id}`}
              src={item.image}
              alt={`${item.title} app icon`}
              className="w-full h-full object-cover"
            />
            <motion.div
              layoutId={`gradient-${item.id}`}
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            />
            <motion.div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <motion.p
                layoutId={`category-${item.id}`}
                className="text-sm opacity-75 mb-1"
              >
                {item.category}
              </motion.p>
              <motion.h2
                layoutId={`title-${item.id}`}
                className="text-lg font-semibold"
              >
                {item.title}
              </motion.h2>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {data.map((item) => {
                if (item.id === selectedId) {
                  return (
                    <React.Fragment key={item.id}>
                      <div className="relative">
                        <motion.img
                          layoutId={`image-${item.id}`}
                          src={item.image}
                          alt={`${item.title} app screenshot`}
                          className="w-full aspect-video object-cover"
                        />
                        <motion.div
                          layoutId={`gradient-${item.id}`}
                          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                        />
                        <motion.div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <motion.p
                            layoutId={`category-${item.id}`}
                            className="text-sm opacity-75 mb-1"
                          >
                            {item.category}
                          </motion.p>
                          <motion.h2
                            layoutId={`title-${item.id}`}
                            className="text-2xl font-semibold"
                          >
                            {item.title}
                          </motion.h2>
                        </motion.div>
                      </div>
                      <motion.div className="p-6">
                        <p className="text-gray-600 mb-4">
                          Experience the power of {item.title.toLowerCase()}{" "}
                          with our intuitive and feature-rich app. Designed to
                          enhance your {item.category.toLowerCase()} experience,
                          this app brings cutting-edge technology to your
                          fingertips.
                        </p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full w-full">
                          Get
                        </button>
                      </motion.div>
                    </React.Fragment>
                  );
                }
                return null;
              })}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}













































"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  {
    id: "1",
    category: "Productivity",
    title: "Task Manager",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80",
    rating: 4.5,
    reviews: 1234,
    description:
      "Boost your productivity with our intuitive Task Manager app. Organize your tasks, set priorities, and track your progress effortlessly.",
    features: [
      "Smart task categorization",
      "Customizable reminders",
      "Progress tracking",
      "Collaboration tools"
    ]
  },
  {
    id: "2",
    category: "Photo & Video",
    title: "Photo Editor",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    rating: 4.7,
    reviews: 5678,
    description:
      "Transform your photos with our powerful Photo Editor. Apply filters, adjust colors, and create stunning visual effects with ease.",
    features: [
      "Advanced filters",
      "Layer support",
      "AI-powered enhancements",
      "Social media integration"
    ]
  },
  {
    id: "3",
    category: "Food & Drink",
    title: "Recipe Finder",
    image:
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&q=80",
    rating: 4.3,
    reviews: 3456,
    description:
      "Discover delicious recipes tailored to your preferences. From quick meals to gourmet dishes, find the perfect recipe for any occasion.",
    features: [
      "Personalized recommendations",
      "Dietary filters",
      "Step-by-step instructions",
      "Meal planning"
    ]
  },
  {
    id: "4",
    category: "Education",
    title: "Language Learner",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&q=80",
    rating: 4.8,
    reviews: 7890,
    description:
      "Master new languages with our interactive Language Learner app. Engage in fun exercises and track your progress as you expand your linguistic skills.",
    features: [
      "Speech recognition",
      "Adaptive learning",
      "Offline mode",
      "Cultural insights"
    ]
  },
  {
    id: "5",
    category: "Lifestyle",
    title: "Meditation Guide",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&q=80",
    rating: 4.6,
    reviews: 2345,
    description:
      "Find inner peace and reduce stress with our Meditation Guide. Explore guided meditations, breathing exercises, and mindfulness techniques.",
    features: [
      "Guided sessions",
      "Sleep stories",
      "Ambient sounds",
      "Progress tracking"
    ]
  },
  {
    id: "6",
    category: "Entertainment",
    title: "Music Streamer",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
    rating: 4.9,
    reviews: 9012,
    description:
      "Enjoy unlimited music streaming with our feature-rich Music Streamer app. Discover new artists, create playlists, and listen to high-quality audio.",
    features: [
      "Personalized playlists",
      "Offline listening",
      "Lyrics display",
      "Social sharing"
    ]
  }
];

const transitionProps = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export default function Component() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(null);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">App Store</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer rounded-lg shadow-md overflow-hidden relative aspect-[3/4]"
            whileHover={{ scale: 1.05 }}
            transition={transitionProps}
          >
            <motion.img
              layoutId={`image-${item.id}`}
              src={item.image}
              alt={`${item.title} app icon`}
              className="w-full h-full object-cover"
            />
            <motion.div
              layoutId={`gradient-${item.id}`}
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 text-white"
              initial={false}
              transition={transitionProps}
            >
              <motion.p
                layoutId={`category-${item.id}`}
                className="text-sm opacity-75 mb-1"
                transition={transitionProps}
              >
                {item.category}
              </motion.p>
              <motion.h2
                layoutId={`title-${item.id}`}
                className="text-lg font-semibold"
                transition={transitionProps}
              >
                {item.title}
              </motion.h2>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleClose}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-background rounded-lg shadow-lg overflow-hidden max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
              transition={transitionProps}
            >
              {data.map((item) => {
                if (item.id === selectedId) {
                  return (
                    <React.Fragment key={item.id}>
                      <div className="relative">
                        <motion.img
                          layoutId={`image-${item.id}`}
                          src={item.image}
                          alt={`${item.title} app screenshot`}
                          className="w-full aspect-video object-cover"
                          transition={transitionProps}
                        />
                        <motion.div
                          layoutId={`gradient-${item.id}`}
                          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                          transition={transitionProps}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-6 text-white"
                          transition={transitionProps}
                        >
                          <motion.p
                            layoutId={`category-${item.id}`}
                            className="text-sm opacity-75 mb-1"
                            transition={transitionProps}
                          >
                            {item.category}
                          </motion.p>
                          <motion.h2
                            layoutId={`title-${item.id}`}
                            className="text-2xl font-semibold"
                            transition={transitionProps}
                          >
                            {item.title}
                          </motion.h2>
                        </motion.div>
                      </div>
                      <motion.div
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, ...transitionProps }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {item.rating} ({item.reviews.toLocaleString()}{" "}
                            reviews)
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Key Features:</h3>
                          <ul className="list-disc list-inside">
                            {item.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" /> Get
                        </Button>
                      </motion.div>
                    </React.Fragment>
                  );
                }
                return null;
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-2 right-2 text-white hover:text-gray-200 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full z-10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
