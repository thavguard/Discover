import { FC, PropsWithChildren } from 'react';
import { createPortal } from "react-dom";

const modalRoot = document.getElementById('modal-root') as HTMLElement

interface Props {
    isOpen: boolean,
    onClose: (e: boolean) => void

}

export const Modal: FC<PropsWithChildren<Props>> = ({ children }) => {
    return createPortal(
        <div>
            Modal {children}
        </div>, modalRoot
    );
};

