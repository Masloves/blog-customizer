import { useEffect } from 'react';

type useOutsideFromCloseProps = {
	formIsOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideFromClose = ({
	formIsOpen,
	rootRef,
	onClose,
	onChange,
}: useOutsideFromCloseProps) => {
	useEffect(() => {
		if (!formIsOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				formIsOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleEscKey = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleEscKey);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose, onChange, formIsOpen]);
};
