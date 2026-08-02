import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

const SHOW_AFTER_PX = 100;

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEventListener(
    'scroll',
    () => {
      setIsVisible(window.scrollY >= SHOW_AFTER_PX);
    },
    undefined,
    { passive: true },
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      type="button"
      size="icon-lg"
      className={cn(
        'fixed right-4 bottom-4 z-40 size-12 rounded-full shadow-lg transition-all duration-200 sm:right-6 sm:bottom-6',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
      aria-label="Вернуться наверх"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </Button>
  );
};
