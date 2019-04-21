import React, {useState, useEffect} from 'react';
import '../styles/DropDownFilterSection.scss';

function DropDownFilterSection(props) {

    const [isDropDownShow, changeDropDownState] = useState(false);
    const [forceUpdateVariable, forceUpdate] = useState(false);
    const [stateData, changeStateData] = useState(new Set());
    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';
    const toggleDropDown = (e) => {
        e.stopPropagation();
        if (isDropDownShow) {
            props.onCloseList([...stateData]);
        }
        changeDropDownState(!isDropDownShow);
    };

    const hasDataValue = (value) => {
        return stateData.has(value.toString());
    };

    const onChangeData = (e) => {
        if (e.target.checked) {
            stateData.add(e.target.value);
            e.target.checked = true;
        } else {
            stateData.delete(e.target.value);
            e.target.checked = false;
        }
        changeStateData(stateData);
        forceUpdate(!forceUpdateVariable); //Variable for the layout re-render, because watcher doesn`t check Set or Array changes
        e.stopPropagation(stateData);
    };
    
    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const uniqueId = Math.random();
            return <form><ul className="list-group">
                {data.map((item, i) => (
                <li key={`li_${uniqueId}_${i}`}>
                    <div className="checkbox">
                        <label
                            htmlFor={`${uniqueId}_${i}`}
                            key={`label_${uniqueId}_${i}`}
                            className="pointer"
                        >
                            <input
                                type="checkbox"
                                id={`${uniqueId}_${i}`}
                                value={item[key]}
                                name={item[key]}
                                checked={hasDataValue(item[key]) ? true : undefined}
                                onChange={onChangeData}
                            />
                            {item[value]}
                        </label>
                    </div>
                </li>
                )
                )}
            </ul></form>
        }
    };

    return (
        <div className="Drop-down-section">
            <i className="material-icons pointer" onClick={toggleDropDown}>{isDropDownShow ? 'expand_less' : 'expand_more'}</i>
            <span>{props.title}</span>
            <div className={`Drop-down-modal ${!isDropDownShow ? 'd-none' : ''}`}>
                {renderList(props.data)}
            </div>
        </div>
    );
}

export default DropDownFilterSection;
