import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import SearchFilterSection from './SearchFilterSection';
import ContentFilterSection from './ContentFilterSection';
import {connect} from 'react-redux';
import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';
import {useDraggable} from '../hooks/Draggable';

export const dataTypes = {
    CONTEXT: 'CONTEXTS',
    DIMENTIONS: 'DIMENTIONS',
    FILTERS: 'FILTERS',
};

export function Filter(props) {
    const onClose = (e) => {
        props.closeEvent(e);
    };

    const [isContextListDisplaying, setIsContextListDisplaying] = useState(false);
    const [isDimentionsListDisplaying, setIsDimentionsListDisplaying] = useState(false);

    const [styles, catchEvent] = useDraggable(props.initialPosition, 20);

    useEffect(
        () => {
            storeFilterData(dataTypes.CONTEXT, props.contexts);
        },
        [],
    );

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
    };

    const onGetDimentions = (ids) => {
        storeCheckedData(dataTypes.DIMENTIONS, ids);
    };

    const onGetFilters = (ids) => {
        storeCheckedData(dataTypes.FILTERS, ids);
    };

    const getDimentions = (ids) => {
        props.getDimentionsFromState([...ids]) //Get Dimentions depends on Context ids
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
        props.getFiltersFromState([...actualIds], props.sortRules).then((action) => {  //Get Filters depends on Dimentions ids
            storeFilterData(dataTypes.FILTERS, action.data);
            sendFiltersListToWidget(action.data, props.filterFiltersChecks);
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
        props.setSortRules(filters);
        if (props.filterDimentionsChecks && props.filterDimentionsChecks.length > 0) {
            getFilters(new Set(props.filterDimentionsChecks));
        }
    };

    const sendFiltersListToWidget = (filters, checks) => {
        if (props.onGetData && filters && checks) {
            props.onGetData(
                filters
                    .filter((filter => checks.indexOf(filter.id) !== -1))
                    .map((filter) => filter.name),
            );
        }
    };

    const storeCheckedData = (type, checks) => {
        switch (type) {
            case dataTypes.CONTEXT:
                props.setContextsChecks(checks);
                break;
            case dataTypes.DIMENTIONS:
                props.setDimentionsChecks(checks);
                break;
            case dataTypes.FILTERS:
                props.setFiltersChecks(checks);
                sendFiltersListToWidget(props.filterFilters, props.filterFiltersChecks);
                break;
            default:
        }
    };

    const storeFilterData = (type, data) => {
        switch (type) {
            case dataTypes.CONTEXT:
                props.setContexts(data);
                break;
            case dataTypes.DIMENTIONS:
                props.setDimentions(data);
                break;
            case dataTypes.FILTERS:
                props.setFilters(data);
                break;
            default:
        }
    };

    return (
        <div className="Filter-modal-wrapper">
            <div className="Filter-modal container" style={styles}>
                <div className="Filter-modal-header row p-1">
                    <div className="col-2 px-1 pt-1">
                        <i className="material-icons draggable" onMouseDown={catchEvent}>drag_indicator</i>
                    </div>
                    <span className="col-8">FILTERS</span>
                    <span className="Filter-close-icon col-2 pt-1 text-right">
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
        sortRules,
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
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setContexts: (data) => dispatch(filtersDataActions.setContextsDataByFilter(ownProps.name, data)),
        setContextsChecks: (checks) => dispatch(filtersDataActions.setContextsChecksByFilter(ownProps.name, checks)),
        setDimentions: (data) => dispatch(filtersDataActions.setDimentionsDataByFilter(ownProps.name, data)),
        setDimentionsChecks: (checks) => dispatch(filtersDataActions.setDimentionsChecksByFilter(ownProps.name, checks)),
        setFilters: (data) => dispatch(filtersDataActions.setFiltersDataByFilter(ownProps.name, data)),
        setFiltersChecks: (checks) => dispatch(filtersDataActions.setFiltersChecksByFilter(ownProps.name, checks)),
        getDimentionsFromState: (ids) => dispatch(filtersActions.getDimentions([...ids])),
        getFiltersFromState: (ids, rules) => dispatch(filtersActions.getFilters([...ids], rules)),
        setSortRules: (filters) => dispatch(filtersDataActions.setSortRulesByFilter(ownProps.name, filters))
    };
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
