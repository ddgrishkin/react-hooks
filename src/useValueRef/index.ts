import {useRef} from 'react';

export type UseValueRef<Value> = React.MutableRefObject<Value>;

export function useValueRef<Value>(value: Value): UseValueRef<Value> {
	const valueRef = useRef(value);
	valueRef.current = value;

	return valueRef;
}
