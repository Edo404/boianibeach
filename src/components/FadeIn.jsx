import useScrollAnimation from '../hooks/useScrollAnimation';

export default function FadeIn({ children, className = '' }) {
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}
