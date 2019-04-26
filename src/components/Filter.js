import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import SearchFilterSection from './SearchFilterSection';
import ContentFilterSection from './ContentFilterSection';
import {connect} from 'react-redux';
import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';

export const dataTypes = {
    CONTEXT: 'CONTEXTS',
    DIMENTIONS: 'DIMENTIONS',
    FILTERS: 'FILTERS',
};

function Filter(props) {
    const onClose = (e) => {
        props.closeEvent(e);
    };

    const [styles, setStyles] = useState({});
    const [isDraggable, setDraggableState] = useState(false);
    const [isContextListDisplaying, setIsContextListDisplaying] = useState(false);
    const [isDimentionsListDisplaying, setIsDimentionsListDisplaying] = useState(false);

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
            storeFilterData(dataTypes.CONTEXT, props.contexts);
        },
        [],
    );

    const onMouseUp = (e) => {
        if (isDraggable) {
            setDraggableState(false);
        }
        e.stopPropagation();
    };

    const onMouseDown = (e) => {
        e.preventDefault();
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
            getDimentions(props.filterContextsChecks);
            setIsDimentionsListDisplaying(true);
        }
        setIsContextListDisplaying(!isContextListDisplaying);
    };

    const onToggleDimentions = () => {
        if (!isDimentionsListDisplaying) {
            closeAllLists();
        } else {
            getFilters(props.filterDimentionsChecks);
        }
        setIsDimentionsListDisplaying(!isDimentionsListDisplaying);
    };

    const onGetContexts = (ids) => {
        storeCheckedData(dataTypes.CONTEXT, ids);
        getDimentions(ids);
    };

    const onGetDimentions = (ids) => {
        storeCheckedData(dataTypes.DIMENTIONS, ids);
    };

    const onGetFilters = (ids) => {
        storeCheckedData(dataTypes.FILTERS, ids);
        if (props.onGetData && props.filterFilters && props.filterFiltersChecks) {
            props.onGetData(
                props.filterFilters
                    .filter((filter => props.filterFiltersChecks.indexOf(filter.id) !== -1))
                    .map((filter) => filter.name)
            );
        }
    };

    const getDimentions = (ids) => {
        props.dispatch(filtersActions.getDimentions([...ids])) //Get Dimentions depends on Context ids
            .then((action) => {
                storeFilterData(dataTypes.DIMENTIONS, action.data);

                if (props.filters && props.filters.length > 0) { //Recalculate filters on Dimention changes
                    if (action.data) {
                        getFilters(new Set(props.filterDimentionsChecks), action.data);
                    }
                }
                return action;
            });
    };

    const getFilters = (ids = new Set(), dimentionsData = undefined) => {
        let dimentions = dimentionsData ? dimentionsData : props.filterDimentions; //For the async cases
        const actualIds = excludeMissingIds(ids, dimentions);
        props.dispatch(filtersActions.getFilters([...actualIds], props.sortRules)).then((action) => {  //Get Filters depends on Dimentions ids
            storeFilterData(dataTypes.FILTERS, action.data);
            return action;
        });
    };

    const excludeMissingIds = (ids = new Set(), checkedData = []) => { //Exclude ids which are missing at checkedData
        const currentIds = checkedData.map(item => item.id);
        const actialIds = [...ids].filter(incomingId => {
            return currentIds.find((id) => id === incomingId);
        });
        return new Set(actialIds);
    };

    const onGetSortRules = (filters) => {
        props.dispatch(filtersDataActions.setSortRulesByFilter(props.name, filters));
        if (props.filterDimentionsChecks && props.filterDimentionsChecks.length > 0) {
            getFilters(new Set(props.filterDimentionsChecks));
        }
    };

    const storeCheckedData = (type, checks) => {
        switch (type) {
            case dataTypes.CONTEXT:
                props.dispatch(filtersDataActions.setContextsChecksByFilter(props.name, checks));
                break;
            case dataTypes.DIMENTIONS:
                props.dispatch(filtersDataActions.setDimentionsChecksByFilter(props.name, checks));
                break;
            case dataTypes.FILTERS:
                props.dispatch(filtersDataActions.setFiltersChecksByFilter(props.name, checks));
                break;
            default:
        }
    };

    const storeFilterData = (type, data) => {
        switch (type) {
            case dataTypes.CONTEXT:
                props.dispatch(filtersDataActions.setContextsDataByFilter(props.name, data));
                break;
            case dataTypes.DIMENTIONS:
                props.dispatch(filtersDataActions.setDimentionsDataByFilter(props.name, data));
                break;
            case dataTypes.FILTERS:
                props.dispatch(filtersDataActions.setFiltersDataByFilter(props.name, data));
                break;
            default:
        }
    };

    return (
        <div className="Filter-modal-wrapper">
            <div className="Filter-modal container" style={styles}>
                <div className="Filter-modal-header row p-1">
                    <div className="col-md-2 px-1">
                        <i className="material-icons draggable" onMouseDown={onMouseDown}>drag_indicator</i>
                    </div>
                    <span className="col-md-8">FILTERS</span>
                    <span className="Filter-close-icon col-md-2">
                        <i className="material-icons pointer" onClick={onClose}>close</i>
                    </span>
                </div>
                <div className="Filter-modal-body row align-items-end">
                    <DropDownFilterSection
                        title="CONTEXTS"
                        onToggleList={onToggleContexts}
                        onSendCheckedData={onGetContexts}
                        data={props.filterContexts}
                        isDisplaying={isContextListDisplaying}
                        checks={props.filterContextsChecks}
                        className="col-md-10 offset-md-2 p-1"
                    />
                    <DropDownFilterSection
                        title="DIMENTIONS"
                        onToggleList={onToggleDimentions}
                        onSendCheckedData={onGetDimentions}
                        data={props.filterDimentions}
                        isDisplaying={isDimentionsListDisplaying}
                        checks={props.filterDimentionsChecks}
                        className="col-md-10 offset-md-2 p-1"
                    />
                    <SearchFilterSection
                        onSendData={onGetSortRules}
                        sortData={props.sortRules}
                        className="col-md-10 offset-md-2 p-2"
                    />
                    <ContentFilterSection
                        data={props.filterFilters}
                        onSendCheckedData={onGetFilters}
                        checks={props.filterFiltersChecks}
                        className="col-md-10 offset-md-2 p-1"
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    const {contexts, dimentions, filters} = state.filters;
    const {
        filterContexts,
        filterContextsChecks,
        filterDimentions,
        filterDimentionsChecks,
        filterFilters,
        filterFiltersChecks,
        sortRules
    } = state.filterData[ownProps.name];
    return {
        contexts,
        dimentions,
        filters,
        filterContexts,
        filterContextsChecks,
        filterDimentions,
        filterDimentionsChecks,
        filterFilters,
        filterFiltersChecks,
        sortRules,
    }
}

const ConnectedFilter = connect(mapStateToProps)(Filter);

export default ConnectedFilter;
