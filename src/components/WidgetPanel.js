import React, {useState} from 'react';
import { Button } from 'antd';
import '../styles/WidgetPanel.css';
import Filter from './Filter'

export default function WidgetPanel() {
    const [isFilterShow, toggleFilter] = useState(false);
    let onToggleFilter = (e) => {
        e.stopPropagation();
        toggleFilter(!isFilterShow);
    };
    return (
        <section className="Widget-panel" >
            <Button className="Widget-button" shape="circle" icon={isFilterShow ? "menu-fold" : "menu-unfold"} onClick={onToggleFilter}/>
            {isFilterShow ? <Filter closeEvent={onToggleFilter}/> : undefined}
        </section>
    );
}
