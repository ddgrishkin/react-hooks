import {useBooleanState} from '../useBooleanState';

export type UsePopupStateProps = {
	initialValue?: boolean;
};

export type UsePopupState = {
	isOpen: boolean;
	close(): void;
	open(): void;
};

export function usePopupState({initialValue = false}: UsePopupStateProps = {}): UsePopupState {
	const {
		value: isOpen,
		setTrue: open,
		setFalse: close,
	} = useBooleanState(initialValue);

	return {close, open, isOpen};
}
