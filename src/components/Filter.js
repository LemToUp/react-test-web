import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import SearchFilterSection from './SearchFilterSection';
import ContentFilterSection from './ContentFilterSection';
import {connect} from 'react-redux';
import {filtersActions} from '../actions/Filters';
import {filtersConstants} from '../constants/Filters';

function Filter(props) {
    const onClose = (e) => {
        props.closeEvent(e);
    };

    const [styles, setStyles] = useState({});
    const [isDraggable, setDraggableState] = useState(false);
    const [isContextListDisplaying, setIsContextListDisplaying] = useState(false);
    const [isDimentionsListDisplaying, setIsDimentionsListDisplaying] = useState(false);

    const [checkedContextState, setCheckedContextState] = useState(new Set());
    const [checkedDimentionsState, setCheckedDimentionsState] = useState(new Set());
    const [checkedFiltersState, setCheckedFiltersState] = useState(new Set());

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

    const onToggleDimentions = () => {
        if (!isDimentionsListDisplaying) {
            closeAllLists();
        }
        setIsDimentionsListDisplaying(!isDimentionsListDisplaying);
    };

    const onGetContexts = (ids = new Set()) => {
        dataHandler(filtersConstants.GET_CONTEXTS_LIST, ids);
    };

    const onGetDimentions = (ids = new Set()) => {
        dataHandler(filtersConstants.GET_DIMENTIONS_LIST, ids);
    };

    const onGetFilters = (ids) => {
        dataHandler(filtersConstants.GET_FILTERS_LIST, ids);
    };

    const onGetSortRules = (data) => {
        debugger;
    };

    const dataHandler = (filtersConstant, ids = new Set()) => {
        switch (filtersConstant) { //Save current checked data
            case filtersConstants.GET_CONTEXTS_LIST:
                setCheckedContextState(ids);
                break;
            case filtersConstants.GET_DIMENTIONS_LIST:
                setCheckedDimentionsState(ids);
                break;
            case filtersConstants.GET_FILTERS_LIST:
                setCheckedFiltersState(ids);
                if (props.onGetData) {
                    props.onGetData(ids);
                }
                break;
            default:
        }

        let contextsIds = undefined;
        let dimentionsIds = undefined;
        switch (filtersConstant) { //Save current checked data
            case filtersConstants.GET_CONTEXTS_LIST:
                contextsIds = [...ids];
                props.dispatch(filtersActions.getDimentions(contextsIds)) //Get Dimentions depends on Context ids
                    .then((action) => {
                        if (props.filters && props.filters.length > 0) { //Recalculate filters on Dimention changes
                            if (action.data && action.data.length > 0) {
                                const currentDimentionsIds = action.data.map(dimention => dimention.id);
                                dimentionsIds = props.filters.map(filter => filter.category_id).filter(
                                    (categotyId) => {
                                        return currentDimentionsIds.find((id) => id === categotyId)
                                    });
                            }
                        }
                        return action;
                    });
            case filtersConstants.GET_DIMENTIONS_LIST:
                if (filtersConstant === filtersConstants.GET_DIMENTIONS_LIST) {
                    dimentionsIds = [...ids];
                }

                if (dimentionsIds) {
                    const curDimentionsIds = props.dimentions.map(dimention => dimention.id);
                    dimentionsIds = dimentionsIds.filter(dimentionId => { //Exclude missing Dimentions
                        return curDimentionsIds.find((id) => id === dimentionId);
                    });
                    props.dispatch(filtersActions.getFilters(dimentionsIds)); //Get Filters depends on Dimentions ids
                }

            case filtersConstants.GET_FILTERS_LIST:
            default:
        }
    };

    return (
        <div className="Filter-modal-wrapper">
            <div className="Filter-modal" style={styles}>
                <div className="Filter-modal-header">
                    <i className="material-icons pointer" onMouseDown={onMouseDown}>drag_indicator</i>
                    <span>FILTERS</span>
                    <span className="Filter-close-icon"><i className="material-icons pointer"
                                                           onClick={onClose}>close</i></span>
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
    const {contexts, dimentions, filters} = state.filters;
    return {
        contexts,
        dimentions,
        filters,
    }
}

const ConnectedFilter = connect(mapStateToProps)(Filter);

export default ConnectedFilter;
