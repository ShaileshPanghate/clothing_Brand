'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../../public/images/logo/logo.png';

export default function Loader({ fullScreen = false }) {
  return (
    <div className={`${fullScreen ? 'fixed inset-0 bg-white z-[9999]' : 'w-full h-full min-h-[200px]'} flex items-center justify-center`}>
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full"
        />

        {/* Brand Text / Initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3], rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs font-bold uppercase tracking-widest text-black"
          >
            <Image src={logo} alt="logo" width={50} height={50} />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
