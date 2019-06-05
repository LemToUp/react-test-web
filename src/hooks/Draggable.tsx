import {useState, useEffect} from 'react';

export function useDraggable(defaultStyle: any, defaultOffset: number) {
    const [styles, setStyles] = useState<any>({display: 'none'});
    const [isDraggable, setDraggableState] = useState(false);
    const [offsetParams] = useState(defaultOffset || 0);

    function onMouseDownHandler(e: MouseEvent) {
        e.preventDefault();
        if (!isDraggable) {
            setDraggableState(true);
        }
        e.stopPropagation();
    }

    useEffect(() => { //Subscribe on mount
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        return function cleanup() { //Unsubscribe after dismount
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    });

    useEffect(
        () => {
            if (defaultStyle) {
                setStyles(Object.assign({display: 'block'}, defaultStyle));
            }
        },
        [],
    );

    const onMouseMove = (e: MouseEvent) => { //Dragging element over mouse
        if (isDraggable) {
            setStyles({
                top: `${e.clientY - offsetParams}px`,
                left: `${e.clientX - offsetParams}px`
            });
        }
        e.stopPropagation();
    };

    const onMouseUp = (e: MouseEvent) => { //Disable dragging
        if (isDraggable) {
            setDraggableState(false);
        }
        e.stopPropagation();
    };

    return [styles, onMouseDownHandler];
}