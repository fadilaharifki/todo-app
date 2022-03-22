import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ModalComponent({ open, setOpen, title, children }) {
    const onCloseModal = () => {
        setOpen(false)
    };

    return (
        <div>
            <Modal open={open} onClose={onCloseModal} center>
                <h3>{title}</h3>
                {children}
            </Modal>
        </div>
    );
};