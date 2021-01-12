import React, { useRef, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { RecessContext } from './RecessContext';
import styles from './styles/MovableWindow.module.css';

const getWindowDimension = () => [window.innerWidth, window.innerHeight];
function moveAt(element, [x, y], [px, py]) {
    let left = x - px;
    left = Math.max(0, left);
    left = Math.min(getWindowDimension()[0] - element.offsetWidth, left);

    let top = y - py;
    top = Math.max(0, Math.min(getWindowDimension()[1] - element.offsetHeight, top));
    element.style.cssText = `--x:${left}px;--y:${top}px;`;
}

const onMouseDown: MouseEventHandler = (event) => {
    const handle = event.currentTarget;
    const container = handle?.parentElement?.parentElement;
    if (!isHTMLElement(container)) return;
    const { x, y } = container.getBoundingClientRect();
    const shiftX = event.clientX - x;
    const shiftY = event.clientY - y;
    moveAt(container, [event.clientX, event.clientY], [shiftX, shiftY]);

    function onMouseMove(e: MouseEvent): void {
        if (!isHTMLElement(container)) return;
        moveAt(container, [e.clientX, e.clientY], [shiftX, shiftY]);
    }
    function onMouseUp(): void {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
};

function isHTMLElement(el) {
    return el instanceof HTMLElement;
}

const MovableWindow = ({ isVisible, title, children, onCloseClick, initialPosition }) => {
    const containerRef = useRef();

    useEffect(() => {
        if (isVisible && containerRef.current) {
            containerRef.current.focus();
        }
    }, [isVisible]);

    const { getPopupOrder, onPopupFocus } = useContext(RecessContext);
    const popupStackOrder = getPopupOrder(containerRef?.current);

    return ReactDOM.createPortal(
        <div
            className={styles.position}
            style={{
                ['--x']: initialPosition?.[0],
                ['--y']: initialPosition?.[1],
                ['--popupStackOrder']: popupStackOrder,
            }}
        >
            <div
                ref={containerRef}
                onFocus={() => onPopupFocus(containerRef.current)}
                tabIndex="0"
                className={classnames(styles.window, styles.transition)}
                data-visible={isVisible}
            >
                <h2
                    title="Drag to move"
                    className={styles.titleBar}
                    onDragStart={() => false}
                    onMouseDown={onMouseDown}
                >
                    <span>{title}</span>
                    <button
                        title="Close"
                        onMouseDown={(e) => e.stopPropagation()}
                        className={styles.closeButton}
                        onClick={(e) => {
                            onCloseClick();
                        }}
                    >
                        <svg viewBox="0 0 100 100" className={styles.closeIcon}>
                            <line x1="0" x2="100" y1="0" y2="100" />
                            <line x1="100" x2="0" y1="0" y2="100" />
                        </svg>
                    </button>
                </h2>
                {children}
            </div>
        </div>,
        document.getElementById('overlay')
    );
};

export default MovableWindow;
