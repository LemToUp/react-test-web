import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import { connect } from 'react-redux';

function Filter(props) {
    const onClose = (e) => {
        props.closeEvent(e);
    };

    const [styles, changeStyles] = useState({});
    const [isDraggable, changeDraggableState] = useState(false);

    useEffect(() => { //Subscribe on mount
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        return function cleanup() { //Unsubscribe after dismount
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    });

    const onMouseUp = (e) => {
        if (isDraggable) {
            changeDraggableState(false);
        }
        e.stopPropagation();
    };

    const onMouseDown = (e) => {
        if (!isDraggable) {
            changeDraggableState(true);
        }
        e.stopPropagation();
    };

    const onMouseMove = (e) => {
        if (isDraggable) {
            changeStyles({
                top: `${e.clientY - 10}px`,
                left: `${e.clientX - 10}px`
            });
        }
        e.stopPropagation();
    };

    let onSelectContexts = (ids) => {
        debugger;
    };

    let onSelectDimentions = (ids) => {
        debugger;
    };

    return (
        <div className="Filter-modal-wrapper">
            <div className="Filter-modal" style={styles}>
                <div className="Filter-modal-header">
                    <i className="material-icons pointer" onMouseDown={onMouseDown}>drag_indicator</i>
                    <span>FILTERS</span>
                    <span className="Filter-close-icon"><i className="material-icons pointer" onClick={onClose}>close</i></span>
                </div>
                <div className="Filter-modal-body">
                    <DropDownFilterSection title="CONTEXTS" onSelect={onSelectContexts} data={props.contexts}/>
                    <DropDownFilterSection title="DIMENTIONS" onSelect={onSelectDimentions} data={[]}/>

                    <div className="Filter-modal-body-section">

                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { contexts } = state.filters;
    return {
        contexts
    }
}

const connectedFilter = connect(mapStateToProps)(Filter);

export default connectedFilter;
