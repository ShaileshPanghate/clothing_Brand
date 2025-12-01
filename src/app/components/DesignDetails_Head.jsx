"use client"
import React from 'react'
import { motion } from "framer-motion";
export const DesignDetails_Head = () => {
  return (
     <div> <motion.h2
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="uppercase flex justify-center items-center -mb-4 text-4xl  font-light tracking-[0.25em]"
            >
              Design Details
            </motion.h2></div>
  )
}
