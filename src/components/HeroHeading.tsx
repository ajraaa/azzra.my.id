import { motion, useReducedMotion } from 'framer-motion';

interface HeroHeadingProps {
  name: string;
  role: string;
  statement: string;
}

export default function HeroHeading({ name, role, statement }: HeroHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-3"
    >
      <h1 className="text-5xl font-bold tracking-tight text-fg">{name}</h1>
      <p className="text-xl text-muted">{role}</p>
      <p className="text-base text-muted max-w-md">{statement}</p>
    </motion.div>
  );
}
