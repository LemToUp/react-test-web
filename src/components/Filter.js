import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import SearchFilterSection from './SearchFilterSection';
import ContentFilterSection from './ContentFilterSection';
import { connect } from 'react-redux';
import { filtersActions } from '../actions/Filters';

function Filter(props) {
    const onClose = (e) => {
        props.closeEvent(e);
    };

    const [styles, setStyles] = useState({});
    const [isDraggable, setDraggableState] = useState(false);
    const [isContextListDisplaying, setIsContextListDisplaying] = useState(false);
    const [isDimentionsListDisplaying, setIsDimentionsListDisplaying] = useState(false);

    const [contextState, setContextState] = useState(new Set());
    const [dimentionsState, setDimentionsState] = useState(new Set());
    const [filtersState, setFiltersState] = useState(new Set());

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
            setDraggableState(false);
        }
        e.stopPropagation();
    };

    const onMouseDown = (e) => {
        if (!isDraggable) {
            setDraggableState(true);
        }
        e.stopPropagation();
    };

    const onMouseMove = (e) => {
        if (isDraggable) {
            setStyles({
                top: `${e.clientY - 10}px`,
                left: `${e.clientX - 10}px`
            });
        }
        e.stopPropagation();
    };

    const closeAllLists = () => {
        setIsContextListDisplaying(false);
        setIsDimentionsListDisplaying(false);
    };

    const onToggleContexts = () => {
        if (!isContextListDisplaying) {
            closeAllLists();
        } else {
            setIsDimentionsListDisplaying(true);
        }
        setIsContextListDisplaying(!isContextListDisplaying);
    };

    const onGetContexts = (ids = new Set()) => {
        setContextState(ids);
        props.dispatch(filtersActions.getDimentions([...ids]))
            .then((action) => {
                if (props.filters && props.filters.length > 0) {
                    //const dimentions = state.data;
                    if (action.data && action.data.length > 0) {
                        recalculateFilters(action.data.map(dimention => dimention.id));
                    }
                }
                return action;
        });
    };

    const onToggleDimentions = () => {
        if (!isDimentionsListDisplaying) {
            closeAllLists();
        }
        setIsDimentionsListDisplaying(!isDimentionsListDisplaying);
    };

    const onGetDimentions = (ids = new Set()) => {
        setDimentionsState(ids);
        props.dispatch(filtersActions.getFilters([...ids])).then((action) => {
            console.log(action);
        }).then((action) => {
            console.log(props.filters);
        });
    };

    const onGetFilters = (data) => {
        setFiltersState(data);
        props.onGetData(data);
    };

    const recalculateFilters = (dimentionsId) => { //Exclude filters of not existing dimentions after Context changed
        let availableIds = props.filters.map(filter => filter.category_id).filter(
            (categotyId) => {
                return dimentionsId.find((id) => id === categotyId)
            });
        availableIds = new Set(availableIds);
        props.dispatch(filtersActions.getFilters([...availableIds]));
    };

    const onGetSortRules = (data) => {
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
                    <DropDownFilterSection
                        title="CONTEXTS"
                        onToggleList={onToggleContexts}
                        onSendCheckedData={onGetContexts.bind(this)}
                        data={props.contexts}
                        isDisplaying={isContextListDisplaying}
                    />
                    <DropDownFilterSection
                        title="DIMENTIONS"
                        onToggleList={onToggleDimentions}
                        onSendCheckedData={onGetDimentions}
                        data={props.dimentions}
                        isDisplaying={isDimentionsListDisplaying}
                    />
                    <SearchFilterSection onSendData={onGetSortRules}/>
                    <ContentFilterSection
                        data={props.filters}
                        onSendCheckedData={onGetFilters}
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { contexts, dimentions, filters } = state.filters;
    return {
        contexts,
        dimentions,
        filters,
    }
}

const ConnectedFilter = connect(mapStateToProps)(Filter);

export default ConnectedFilter;
