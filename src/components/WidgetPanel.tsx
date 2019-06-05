import React, {useState, useEffect, ChangeEvent, MouseEvent} from 'react';
import '../styles/WidgetPanel.scss';
import Filter from './Filter';
import {connect} from 'react-redux';
import {filtersDataActions} from '../actions/FilterData';
import {Dispatch} from "redux";

interface Props {
    list: string[],
    dispatch: Dispatch,
    number: number,
}

function WidgetPanel(props: Props) {
    const [isFilterShow, toggleFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(props.list || []);
    const [forceUpdateVariable, forceUpdate] = useState(false);
    const [initialFilterCoordinates, updateInitialFilterCoordinates] = useState<any>({top: 0, left: 0});

    useEffect(
        () => {
            props.dispatch(filtersDataActions.initFilterSection(`filter_${props.number}`)); //Bad decision to create filter section
        },
        [],
    );

    const onCloseFilter = (e: ChangeEvent) => {
        e.stopPropagation();
        toggleFilter(false);
    };

    const onToggleFilter = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.clientY && e.clientX) {
            updateInitialFilterCoordinates({
                top: `${e.clientY}px`,
                left: `${e.clientX}px`,
            });
        }
        toggleFilter(!isFilterShow);
    };

    const onGetFilters = (data: string[]) => { //Get data from filter
        setSelectedFilters(data);
        forceUpdate(!forceUpdateVariable);
    };

    const renderList = (data: string[]) => {
        if (Array.isArray(data) && data.length > 0) {
            return <ul className="list-group m-2 p-1">
                {data.map((filterName, i) => (
                        <li key={`sected_filters_${i}`} className="widget-row" id={`sected_filters_${i}`}>
                            <p className="mb-0">{filterName}</p>
                        </li>
                    ),
                )}
            </ul>;
        }
    };

    return (
        <section className="Widget-panel col-md-4 mb-1 p-1">
            <div className="row row align-items-start">
                <div className="Widget-button col-md-4">
                    <i className="material-icons btn-circle toggle-button" onClick={onToggleFilter}>
                        {isFilterShow ? 'format_indent_decrease' : 'format_indent_increase'}
                    </i>
                </div>
                <div className="Widget-list col-8">
                    {renderList(selectedFilters)}
                </div>

                {isFilterShow ?
                    <Filter
                        closeEvent={onCloseFilter}
                        onGetData={onGetFilters}
                        name={`filter_${props.number}`}
                        initialPosition={initialFilterCoordinates}
                    /> : null}
            </div>
        </section>
    );
}

function mapStateToProps(state: any) {
    const {filters} = state.filters;
    return {
        filters,
    };
}

const ConnectedWidgetPanel = connect(mapStateToProps)(WidgetPanel);

export default ConnectedWidgetPanel;
