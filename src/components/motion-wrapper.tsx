'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  delay = 0,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is in view, only once
      transition={{ duration: 0.5, delay: delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper; 