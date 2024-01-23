import {RefObject, useRef, useEffect, useCallback} from 'react';
import {useValueRef} from '../useValueRef';

export type UseIntersectionObserverOptions = IntersectionObserverInit;

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  options: UseIntersectionObserverOptions = {},
) {
  const rootRef = useRef<HTMLElement | undefined>(undefined);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);
  const callbackRef = useValueRef<IntersectionObserverCallback>(callback);

  const unobserve = useCallback(() => {
    if (observerRef.current && rootRef.current) {
      observerRef.current.unobserve(rootRef.current);
      rootRef.current = undefined;
    }
  }, []);

  useEffect(() => unobserve, []);
  useEffect(() => {
    if (ref.current) {
      rootRef.current = ref.current;
      observerRef.current = new IntersectionObserver(
        callbackRef.current,
        options,
      );

      observerRef.current.observe(rootRef.current);
    }

    return unobserve;
  }, [options.rootMargin, options.threshold]);
}
