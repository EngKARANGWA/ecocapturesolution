import type { CSSProperties, ReactNode } from 'react';

type MarqueeListProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  duration?: string;
  className?: string;
  itemClassName?: string;
};

export default function MarqueeList<T>({
  items,
  getKey,
  renderItem,
  duration = '28s',
  className = '',
  itemClassName = 'shrink-0',
}: MarqueeListProps<T>) {
  const marqueeStyle = {
    ['--marquee-duration' as string]: duration,
  } as CSSProperties;

  return (
    <div className="overflow-hidden">
      {/* Moving marquee — only for viewers who allow motion. Duplicated track creates the seamless loop. */}
      <div className={`marquee-track hidden motion-safe:flex w-max ${className}`} style={marqueeStyle}>
        <div className="flex w-max items-center gap-6 pr-6">
          {items.map((item) => (
            <div key={getKey(item)} className={itemClassName}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        <div className="flex w-max items-center gap-6 pr-6" aria-hidden="true">
          {items.map((item) => (
            <div key={`${getKey(item)}-clone`} className={itemClassName}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Static fallback for reduced-motion — single, non-duplicated list, no animation. */}
      <div className={`hidden motion-reduce:flex flex-wrap items-center justify-center gap-6 ${className}`}>
        {items.map((item) => (
          <div key={getKey(item)} className={itemClassName}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}