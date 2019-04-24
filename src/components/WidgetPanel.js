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
        toggleFilter(!isFilterShow);
    };

    const onGetFilters = (data) => {
        setSelectedFilters(data);
        forceUpdate(!forceUpdateVariable);
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0 && selectedFilters.size > 0) {
            return <ul className="list-group">
                {data.filter(item => selectedFilters.has(item.id)).map((item, i) => (
                        <li key={i}>
                            <p>{item.name}</p>
                        </li>
                    )
                )}
            </ul>
        }
    };

    return (
        <section className="Widget-panel">
            <div className=" Widget-button">
                <i className="material-icons btn-circle" onClick={onToggleFilter}>
                    {isFilterShow ? 'format_indent_decrease' : 'format_indent_increase'}
                </i>
            </div>
            {isFilterShow ?
                <Filter
                    closeEvent={onToggleFilter}
                    onGetData={onGetFilters}
                    name={`filter_${props.number}`}
                /> : undefined}

            <div className="Widget-list">
                {renderList(props.filters)}
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
