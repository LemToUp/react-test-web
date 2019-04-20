import React, {useState} from 'react';
import '../styles/WidgetPanel.scss';
import Filter from './Filter'

export default function WidgetPanel() {
    const [isFilterShow, toggleFilter] = useState(false);
    let onToggleFilter = (e) => {
        e.stopPropagation();
        toggleFilter(!isFilterShow);
    };
    return (
        <section className="Widget-panel" >
            <i className="material-icons btn-circle" onClick={onToggleFilter}>
                {isFilterShow ? 'format_indent_decrease' : 'format_indent_increase'}
            </i>
            {isFilterShow ? <Filter closeEvent={onToggleFilter}/> : undefined}
        </section>
    );
}
