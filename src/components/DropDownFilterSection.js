import React, {useState} from 'react';
import {Icon} from 'antd';

function DropDownFilterSection(props) {

    const [isDropDownShow, changeDropDownState] = useState(false);
    const toggleDropDown = (e) => {
       e.stopPropagation();
       changeDropDownState(!isDropDownShow);
    };
    const renderList = () => {

    };

    return (
        <div className="Drop-down-section">
            <Icon type="down" onClick={toggleDropDown}/><span>{props.title}</span>
            <div className="Drop-down-list">
                <ul>
                    {renderList()}
                </ul>
            </div>
        </div>
    );
}

export default DropDownFilterSection;
