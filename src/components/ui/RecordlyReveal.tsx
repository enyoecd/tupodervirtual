import React, { useEffect, useRef, useState } from 'react';

export type RecordlyVariant = 'fade-up' | 'blur-up' | 'spring-perspective' | 'scale-up';

interface RecordlyRevealProps {
  children: React.ReactNode;
  variant?: RecordlyVariant;
  /** Delay in seconds (e.g. 0, 0.1, 0.2, 0.3, 0.4, 0.5) matching Recordly's stagger */
  delay?: number;
  /** Duration in seconds (defaults: 1s for fade-up, 0.7s for blur-up, 0.85s for spring-perspective) */
  duration?: number;
  /** Vertical offset in px (default: 40px for fade-up, 20px for blur-up) */
  yOffset?: number;
  /** IntersectionObserver threshold (0 to 1, default 0.18 so tall mobile cards trigger reliably) */
  threshold?: number;
  /** Trigger immediately on mount (like Recordly Hero / onMount elements) */
  triggerOnMount?: boolean;
  className?: string;
  id?: string;
}

/**
 * Replicates Recordly.dev's Framer Motion appear effects:
 * - 'fade-up': y: 40 -> 0, opacity: 0.001 -> 1, duration: 1s, ease: cubic-bezier(0.12, 0.23, 0.17, 0.99)
 * - 'blur-up': filter: blur(10px) -> blur(0px), y: 20 -> 0, opacity: 0.001 -> 1, duration: 0.7s, ease: cubic-bezier(0.12, 0.23, 0.17, 0.98)
 * - 'spring-perspective': perspective(1200px) y: 32 -> 0, scale: 0.97 -> 1, opacity: 0.001 -> 1
 */
export const RecordlyReveal: React.FC<RecordlyRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  yOffset,
  threshold = 0.15,
  triggerOnMount = false,
  className = '',
  id,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const resolvedDuration =
    duration ?? (variant === 'blur-up' ? 0.7 : variant === 'spring-perspective' ? 0.85 : 1.0);
  const resolvedY =
    yOffset ?? (variant === 'blur-up' ? 20 : variant === 'spring-perspective' ? 32 : 40);
  const easing =
    variant === 'blur-up'
      ? 'cubic-bezier(0.12, 0.23, 0.17, 0.98)'
      : variant === 'spring-perspective'
      ? 'cubic-bezier(0.16, 1, 0.3, 1)'
      : 'cubic-bezier(0.12, 0.23, 0.17, 0.99)';

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsVisible(true);
      setHasFinished(true);
      return;
    }

    // Respect reduced motion preference
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      setHasFinished(true);
      return;
    }

    if (triggerOnMount) {
      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnMount]);

  useEffect(() => {
    if (!isVisible || hasFinished) return;
    const totalMs = (delay + resolvedDuration) * 1000 + 80;
    const timer = setTimeout(() => {
      setHasFinished(true);
    }, totalMs);
    return () => clearTimeout(timer);
  }, [isVisible, hasFinished, delay, resolvedDuration]);

  const getInitialStyle = (): React.CSSProperties => {
    if (hasFinished) {
      return {};
    }

    if (!isVisible) {
      if (variant === 'blur-up') {
        return {
          opacity: 0.001,
          filter: 'blur(10px)',
          transform: `translate3d(0, ${resolvedY}px, 0)`,
          willChange: 'transform, opacity, filter',
        };
      }
      if (variant === 'spring-perspective') {
        return {
          opacity: 0.001,
          transform: `perspective(1200px) translate3d(0, ${resolvedY}px, 0) scale(0.97)`,
          willChange: 'transform, opacity',
        };
      }
      if (variant === 'scale-up') {
        return {
          opacity: 0.001,
          transform: `translate3d(0, ${resolvedY}px, 0) scale(0.96)`,
          willChange: 'transform, opacity',
        };
      }
      return {
        opacity: 0.001,
        transform: `translate3d(0, ${resolvedY}px, 0)`,
        willChange: 'transform, opacity',
      };
    }

    // Visible and currently animating
    if (variant === 'blur-up') {
      return {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translate3d(0, 0, 0)',
        transition: `opacity ${resolvedDuration}s ${easing} ${delay}s, transform ${resolvedDuration}s ${easing} ${delay}s, filter ${resolvedDuration}s ${easing} ${delay}s`,
        willChange: 'transform, opacity, filter',
      };
    }

    if (variant === 'spring-perspective') {
      return {
        opacity: 1,
        transform: 'perspective(1200px) translate3d(0, 0, 0) scale(1)',
        transition: `opacity ${resolvedDuration}s ${easing} ${delay}s, transform ${resolvedDuration}s ${easing} ${delay}s`,
        willChange: 'transform, opacity',
      };
    }

    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale(1)',
      transition: `opacity ${resolvedDuration}s ${easing} ${delay}s, transform ${resolvedDuration}s ${easing} ${delay}s`,
      willChange: 'transform, opacity',
    };
  };

  return (
    <div ref={ref} id={id} className={className} style={getInitialStyle()}>
      {children}
    </div>
  );
};

interface RecordlyScrollDepthCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

/**
 * Replicates Recordly's FeatureCard scroll transform effect:
 * Enters with Recordly's 1s fade-up curve, and on desktop subtly recedes
 * (scale: 1 -> 0.98, translateY: 0 -> -16px) when scrolled past the upper half of the viewport.
 */
export const RecordlyScrollDepthCard: React.FC<RecordlyScrollDepthCardProps> = ({
  children,
  className = '',
  id,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    const updateScroll = () => {
      ticking = false;
      if (window.innerWidth < 1024) {
        setScrollProgress(0);
        return;
      }
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const triggerTop = 140;
      if (rect.top < triggerTop && rect.bottom > 100) {
        const p = Math.min(1, Math.max(0, (triggerTop - rect.top) / 280));
        setScrollProgress(p);
      } else {
        setScrollProgress(0);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scale = 1 - scrollProgress * 0.02; // 1 -> 0.98 (Recordly exact target)
  const translateY = -scrollProgress * 16; // 0 -> -16px (Recordly exact target)

  return (
    <RecordlyReveal variant="fade-up" delay={delay} id={id} className={className}>
      <div
        ref={cardRef}
        style={
          scrollProgress > 0.005
            ? {
                transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
                transition: 'transform 0.18s cubic-bezier(0.12, 0.23, 0.17, 0.99)',
                willChange: 'transform',
              }
            : undefined
        }
      >
        {children}
      </div>
    </RecordlyReveal>
  );
};

