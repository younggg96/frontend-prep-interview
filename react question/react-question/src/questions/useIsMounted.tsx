import { useEffect, useRef } from 'react';

export function useIsMounted(): () => boolean {
    const ref: any = useRef();
  // your code here
    useEffect(() => {
        ref.current = true;

        return () => {
            ref.current = false;
        }
    }, [])

    return () => ref.current;
}