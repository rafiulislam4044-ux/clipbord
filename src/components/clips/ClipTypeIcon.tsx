import React from 'react';
import { Type, Code, Image, Link as LinkIcon } from 'lucide-react';
import { ClipType } from '@/types';
import { cn } from '@/lib/utils';

const config: Record<ClipType, { icon: React.ElementType; color: string; label: string }> = {
  text: { icon: Type, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', label: 'Text' },
  code: { icon: Code, color: 'bg-primary/10 text-primary', label: 'Code' },
  image: { icon: Image, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', label: 'Image' },
  link: { icon: LinkIcon, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', label: 'Link' },
};

interface ClipTypeIconProps {
  type: ClipType;
  showLabel?: boolean;
  className?: string;
}

export const ClipTypeIcon: React.FC<ClipTypeIconProps> = ({ type, showLabel = true, className }) => {
  const c = config[type];
  const Icon = c.icon;

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', c.color, className)}>
      <Icon className="h-3 w-3" />
      {showLabel && c.label}
    </span>
  );
};
