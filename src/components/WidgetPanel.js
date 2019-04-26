import React, {useState, useEffect} from 'react';
import '../styles/WidgetPanel.scss';
import Filter from './Filter'
import {connect} from 'react-redux';
import {filtersDataActions} from '../actions/FilterData';

function WidgetPanel(props) {
    const [isFilterShow, toggleFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(new Set());
    const [forceUpdateVariable, forceUpdate] = useState(false);

    useEffect(
        () => {
            props.dispatch(filtersDataActions.initFilterSection(`filter_${props.number}`));
        },
        [],
    );

    const onToggleFilter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFilter(!isFilterShow);
    };

    const onGetFilters = (data) => {
        setSelectedFilters(data);
        forceUpdate(!forceUpdateVariable);
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            return <ul className="list-group m-2 p-1">
                {data.map((filterName, i) => (
                        <li key={i}>
                            <p className="mb-0">{filterName}</p>
                        </li>
                    )
                )}
            </ul>
        }
    };

    return (
        <section className="Widget-panel col-md-4 mb-1 p-1">
            <div className="row row align-items-start">
                <div className="Widget-button col-md-4">
                    <i className="material-icons btn-circle" onClick={onToggleFilter}>
                        {isFilterShow ? 'format_indent_decrease' : 'format_indent_increase'}
                    </i>
                </div>
                <div className="Widget-list col-md-8">
                    {renderList(selectedFilters)}
                </div>

                {isFilterShow ?
                    <Filter
                        closeEvent={onToggleFilter}
                        onGetData={onGetFilters}
                        name={`filter_${props.number}`}
                    /> : undefined}
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    const { filters } = state.filters;
    return {
        filters,
    }
}

const ConnectedWidgetPanel = connect(mapStateToProps)(WidgetPanel);

export default ConnectedWidgetPanel;
