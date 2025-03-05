import { AnimatePresence, motion } from "framer-motion";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  keyToAnimate?: string;
}

export default function PageTransitionWrapper({
  children,
  keyToAnimate = "pageTransitionWrapper",
}: PageTransitionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyToAnimate}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
