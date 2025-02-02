import "./Modal.css"

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";



interface IModalProps {
	children: ReactNode;
	doCloseOutside: boolean;
	onClose: () => void;
	container?: Element;
	className: string;
}

export function Modal(props: IModalProps) {
	const {
		children,
		doCloseOutside,
		onClose,
		container = document.body,
		className,
	} = props;

	const modalRef = useRef<HTMLDivElement | null>(null);
    // Функция, которая закрывает модалочку если ты кликнешь мимо нее
	function handleClickOutside(event: MouseEvent) {
		if (event.target != modalRef.current) {
			onClose();
		}
	}
    // Юзефект, который отлавливает клик вне модалочки
	useEffect(() => {
		if (doCloseOutside) {
			document.addEventListener("click", handleClickOutside);
			return () => {
				document.removeEventListener("click", handleClickOutside);
			};
		}
	}, []); 
    // createPortal переносит модалочку в body
	return createPortal(
		(<div ref={modalRef} className={"modal " + className} >
			{children}
		</div>),
		container
	);
}
