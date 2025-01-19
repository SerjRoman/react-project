import "./Modal.css"
import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"


interface IModalProps {
	children: ReactNode
	doCloseOutside: boolean
	onClose: () => void
	container?: Element
	className: string
}

export function Modal(props: IModalProps) {
	const {
		children,
		doCloseOutside,
		onClose,
		container = document.body,
		className,
	} = props

	const modalRef = useRef<HTMLDivElement | null>(null);

	function handleClickOutside(event: MouseEvent) {
		if (event.target != modalRef.current) {
			onClose();
		}
	}

	useEffect(() => {
		if (doCloseOutside) {
			document.addEventListener("click", handleClickOutside);
			return () => {
				document.removeEventListener("click", handleClickOutside);
			}
		}
	}, []) 
    
	return createPortal(
		(<div ref={modalRef} className={"modal " + className} >
			{children}
		</div>),
		container
	)
}