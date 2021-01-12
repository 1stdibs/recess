import React from 'react';
import styles from './styles/Toast.module.css';
import Button from './Button';
const Toast = ({ onCloseClick, message, isVisible }) => {
    const toastRef = React.useRef();

    React.useEffect(() => {
        if (isVisible && toastRef.current) {
            toastRef.current.focus();
        }
    }, [isVisible]);

    return (
        <div className={styles.toastContainer} data-visible={isVisible}>
            <div tabindex="-1" ref={toastRef} className={styles.toast}>
                <h2>Command copied to clipboard:</h2>
                <textarea rows={10} readOnly className={styles.code} value={message} />
                <Button className={styles.closeButton} onClick={onCloseClick}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default Toast;
