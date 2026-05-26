import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

export default function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on('change', (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsub;
  }, [display]);

  const [initial] = useState(value);

  return (
    <motion.span ref={ref} className={className}>
      {initial.toLocaleString()}
    </motion.span>
  );
}
