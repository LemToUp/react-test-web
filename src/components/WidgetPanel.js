import React, {useState} from 'react';
import '../styles/WidgetPanel.scss';
import Filter from './Filter'

export default function WidgetPanel() {
    const [isFilterShow, toggleFilter] = useState(false);
    const [filtersData, setFiltersData] = useState([]);

    const onToggleFilter = (e) => {
        e.stopPropagation();
        toggleFilter(!isFilterShow);
    };

    const onGetFilters = (data) => {
        setFiltersData(data);
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            //debugger;
            return <ul className="list-group">
                {data.map((item, i) => (
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
                /> : undefined}

            <div className="Widget-list">
                {renderList(filtersData)}
            </div>
        </section>
    );
}
