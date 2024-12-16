import React from "react";
import { Phone, Music, Timer, Volume2, Mic, User } from "lucide-react";
import { motion } from "framer-motion";

const iconVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

const Avatar: React.FC<{ src?: string; fallback: React.ReactNode }> = ({
  src,
  fallback,
}) => (
  <motion.div
    className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center"
    variants={iconVariants}
    initial="initial"
    animate="animate"
  >
    {src ? (
      <img src={src} alt="Avatar" className="w-full h-full object-cover" />
    ) : (
      fallback
    )}
  </motion.div>
);

export const DefaultNotification: React.FC<{ message: string }> = ({
  message,
}) => (
  <div className="flex items-center justify-between w-full h-full">
    <Avatar fallback={<User className="w-5 h-5 text-gray-600" />} />
    <motion.span
      className="text-sm font-medium ml-3 flex-grow"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {message}
    </motion.span>
  </div>
);

export const DefaultExpandedNotification: React.FC<{ message: string }> = ({
  message,
}) => (
  <motion.div
    className="mt-2"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <p className="text-sm">{message}</p>
  </motion.div>
);

export const CallNotification: React.FC<{
  caller: string;
  avatar?: string;
}> = ({ caller, avatar }) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar
        src={avatar}
        fallback={<Phone className="w-5 h-5 text-teal-400" />}
      />
      <div>
        <span className="text-sm font-medium">Incoming call</span>
        <motion.span
          className="text-xs text-gray-400 block"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: 0.1,
          }}
        >
          {caller}
        </motion.span>
      </div>
    </div>
    <motion.div
      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Phone className="w-4 h-4 text-white" />
    </motion.div>
  </div>
);

export const CallExpandedNotification: React.FC<{
  caller: string;
  avatar?: string;
}> = ({ caller, avatar }) => (
  <motion.div
    className="mt-2 space-y-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <div className="flex items-center space-x-3">
      <Avatar
        src={avatar}
        fallback={<User className="w-6 h-6 text-gray-600" />}
      />
      <p className="text-lg font-medium">{caller}</p>
    </div>
    <div className="flex justify-around">
      <motion.button
        className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Answer
      </motion.button>
      <motion.button
        className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Decline
      </motion.button>
    </div>
  </motion.div>
);

export const MusicNotification: React.FC<{
  title: string;
  artist: string;
  cover?: string;
}> = ({ title, artist, cover }) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar
        src={cover}
        fallback={<Music className="w-5 h-5 text-purple-400" />}
      />
      <div className="flex flex-col">
        <motion.span
          className="text-sm font-medium"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {title}
        </motion.span>
        <motion.span
          className="text-xs text-gray-400"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: 0.1,
          }}
        >
          {artist}
        </motion.span>
      </div>
    </div>
    <motion.div
      className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Mic className="w-4 h-4 text-white" />
    </motion.div>
  </div>
);

export const MusicExpandedNotification: React.FC<{
  title: string;
  artist: string;
  cover?: string;
}> = ({ title, artist, cover }) => (
  <motion.div
    className="mt-2 space-y-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <div className="flex items-center space-x-3">
      <Avatar
        src={cover}
        fallback={<Music className="w-6 h-6 text-purple-400" />}
      />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-400">{artist}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <motion.button
        className="text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Volume2 className="w-5 h-5" />
      </motion.button>
      <div className="flex space-x-4">
        {["⏮️", "⏯️", "⏭️"].map((icon, index) => (
          <motion.button
            key={icon}
            className="text-white text-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {icon}
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

export const TimerNotification: React.FC<{ time: string }> = ({ time }) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar fallback={<Timer className="w-5 h-5 text-yellow-400" />} />
      <span className="text-sm font-medium">Timer</span>
    </div>
    <motion.span
      className="text-sm font-bold"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {time}
    </motion.span>
  </div>
);

export const TimerExpandedNotification: React.FC<{ time: string }> = ({
  time,
}) => (
  <motion.div
    className="mt-2 space-y-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <motion.p
      className="text-3xl font-bold text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
    >
      {time}
    </motion.p>
    <div className="flex justify-around">
      <motion.button
        className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Stop
      </motion.button>
      <motion.button
        className="bg-yellow-500 text-white px-6 py-2 rounded-full text-sm font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Pause
      </motion.button>
    </div>
  </motion.div>
);
