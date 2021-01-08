import React from 'react';
import styles from './styles/Toast.module.css';
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
          <p>{message}</p>
          <button className={styles.closeButton} onClick={onCloseClick} type="button">
                close
            </button>
        </div>
      </div>
    );
  };

export default Toast;