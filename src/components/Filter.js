import React, {useState, useEffect} from 'react';
import '../styles/Filter.scss';
import DropDownFilterSection from './DropDownFilterSection';
import SearchFilterSection from './SearchFilterSection';
import ContentFilterSection from './ContentFilterSection';
import {connect} from 'react-redux';
import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';

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
            storePersonalContextsData(props.contexts);
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
        storePersonalContextsChecks([...ids]);
        getDimentions(ids);
    };

    const onGetDimentions = (ids = new Set()) => {
        storePersonalDimentionsChecks([...ids]);
        getFilters(ids);
    };

    const onGetFilters = (ids) => {
        storePersonalFiltersChecks([...ids]);
        if (props.onGetData) {
            props.onGetData(ids);
        }
    };

    const getDimentions = (ids) => {
        props.dispatch(filtersActions.getDimentions([...ids])) //Get Dimentions depends on Context ids
            .then((action) => {
                debugger;
                storePersonalDimentionsData(action.data);

                if (props.filters && props.filters.length > 0) { //Recalculate filters on Dimention changes
                    if (action.data) {
                        const currentDimentionsIds = action.data.map(dimention => dimention.id);
                        const dimentionsIds = props.filters.map(filter => filter.category_id).filter(
                            (categotyId) => {
                                return currentDimentionsIds.find((id) => id === categotyId)
                            });
                        getFilters(new Set(dimentionsIds));
                    }
                }
                return action;
            });
    };

    const getFilters = (ids) => {
        const curDimentionsIds = props.dimentions.map(dimention => dimention.id);
        const dimentionsIds = [...ids].filter(dimentionId => { //Exclude missing Dimentions
            return curDimentionsIds.find((id) => id === dimentionId);
        });
        props.dispatch(filtersActions.getFilters(dimentionsIds)).then((action) => {  //Get Filters depends on Dimentions ids
            storePersonalFiltersData(action.data);
            return action;
        });
    };

    const onGetSortRules = (data) => {
        debugger;
    };

    const storePersonalContextsData = (data) => {
        props.dispatch(filtersDataActions.setContextsDataByFilter(props.name, data));
    };

    const storePersonalContextsChecks = (checks) => {
        props.dispatch(filtersDataActions.setContextsChecksByFilter(props.name, checks));
    };

    const storePersonalDimentionsData = (data) => {
        props.dispatch(filtersDataActions.setDimentionsDataByFilter(props.name, data));
    };

    const storePersonalDimentionsChecks = (checks) => {
        props.dispatch(filtersDataActions.setDimentionsChecksByFilter(props.name, checks));
    };

    const storePersonalFiltersData = (data) => {
        props.dispatch(filtersDataActions.setFiltersDataByFilter(props.name, data));
    };

    const storePersonalFiltersChecks = (checks) => {
        props.dispatch(filtersDataActions.setFiltersChecksByFilter(props.name, checks));
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
                        data={props.filterContexts}
                        isDisplaying={isContextListDisplaying}
                    />
                    <DropDownFilterSection
                        title="DIMENTIONS"
                        onToggleList={onToggleDimentions}
                        onSendCheckedData={onGetDimentions}
                        data={props.filterDimentions}
                        isDisplaying={isDimentionsListDisplaying}
                    />
                    <SearchFilterSection onSendData={onGetSortRules}/>
                    <ContentFilterSection
                        data={props.filterFilters}
                        onSendCheckedData={onGetFilters}
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    const {contexts, dimentions, filters} = state.filters;
    const {filterContexts, filterDimentions, filterFilters} = state.filterData[ownProps.name];
    return {
        contexts,
        filterContexts,
        dimentions,
        filterDimentions,
        filters,
        filterFilters,
    }
}

const ConnectedFilter = connect(mapStateToProps)(Filter);

export default ConnectedFilter;
