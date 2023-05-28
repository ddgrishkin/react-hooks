import {RefObject, useEffect} from 'react';
import {useValueRef} from './useValueRef';

type Props = {
	onClickOutside(): void;
	targetRef: RefObject<HTMLElement>;
}

export function useClickOutside({onClickOutside, targetRef}: Props) {
	const clickOutsideRef = useValueRef(onClickOutside);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (targetRef.current) {
				const target = event.target as HTMLElement;
				if (targetRef.current === target || !targetRef.current.contains(target)) {
					clickOutsideRef.current();
				}
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);
}
