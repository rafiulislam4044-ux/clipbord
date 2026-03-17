import React, { useState, useEffect, useRef } from 'react';

export const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '10,000+', label: 'Clips Created' },
    { value: '4', label: 'Content Types' },
    { value: '100%', label: 'Free Forever' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div ref={ref} className="border-y border-border bg-card py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`text-center ${visible ? 'count-up-visible' : 'opacity-0'}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="text-3xl md:text-4xl font-extrabold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
