import React from "react";
import { Phone, Music, Timer, Volume2, Mic, User } from "lucide-react";
import { motion } from "framer-motion";
import {
  Battery,
  Wifi,
  Bluetooth,
  Download,
  CloudLightning,
  MessageCircle,
  Navigation,
} from "lucide-react";

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

export const DefaultNotification: React.FC<{
  message: string;
  avatar?: string;
}> = ({ message, avatar }) => (
  <div className="flex items-center justify-between w-full h-full">
    <Avatar
      src={avatar}
      fallback={<User className="w-5 h-5 text-gray-600" />}
    />
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
        fallback={<Phone className="w-4 h-4 text-teal-400" />}
      />
      <div>
        <span className="text-sm">Incoming call</span>
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
          className="text-sm"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {title}
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

export const WifiNotification: React.FC<{ networkName: string }> = ({
  networkName,
}) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar fallback={<Wifi className="w-5 h-5 text-blue-400" />} />
      <span className="text-sm">Connected to {networkName}</span>
    </div>
    <motion.div
      className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Wifi className="w-4 h-4 text-blue-500" />
    </motion.div>
  </div>
);

export const BatteryNotification: React.FC<{ percentage: number }> = ({
  percentage,
}) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar fallback={<Battery className="w-5 h-5 text-green-400" />} />
      <span className="text-sm">Battery Status</span>
    </div>
    <motion.span
      className="text-sm font-bold"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {percentage}%
    </motion.span>
  </div>
);

export const GPSNotification: React.FC<{ destination: string }> = ({
  destination,
}) => (
  <div className="flex items-center justify-between w-full h-full">
    <div className="flex items-center space-x-3">
      <Avatar fallback={<Navigation className="w-5 h-5 text-green-500" />} />
      <span className="text-sm">Navigating to</span>
    </div>
    <motion.span
      className="text-sm font-medium"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {destination}
    </motion.span>
  </div>
);

export const WifiExpandedNotification: React.FC<{
  networkName: string;
  signalStrength: number;
}> = ({ networkName, signalStrength }) => (
  <motion.div
    className="mt-2 space-y-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar fallback={<Wifi className="w-6 h-6 text-blue-400" />} />
        <div>
          <p className="text-sm font-medium">{networkName}</p>
          <p className="text-xs text-gray-400">
            Signal Strength: {signalStrength}%
          </p>
        </div>
      </div>
      <motion.div
        className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${signalStrength}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
    <div className="flex justify-around">
      <motion.button
        className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Disconnect
      </motion.button>
      <motion.button
        className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-xs font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Network Settings
      </motion.button>
    </div>
  </motion.div>
);

export const BatteryExpandedNotification: React.FC<{
  percentage: number;
  isCharging: boolean;
}> = ({ percentage, isCharging }) => (
  <motion.div
    className="mt-2 space-y-4"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar fallback={<Battery className="w-6 h-6 text-green-400" />} />
        <div>
          <p className="text-sm font-medium">Battery Status</p>
          <p className="text-xs text-gray-400">
            {isCharging ? "Charging" : "Not Charging"}
          </p>
        </div>
      </div>
      <motion.div
        className="w-12 h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 relative"
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.div
          className={`h-full ${
            percentage > 20 ? "bg-green-500" : "bg-red-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
        {isCharging && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CloudLightning className="w-4 h-4 text-yellow-400" />
          </motion.div>
        )}
      </motion.div>
    </div>
    <p className="text-center text-2xl font-bold">{percentage}%</p>
    {percentage <= 20 && !isCharging && (
      <p className="text-center text-red-500 text-sm">
        Low Battery! Please charge your device.
      </p>
    )}
  </motion.div>
);
