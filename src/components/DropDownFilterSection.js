import React, {useState} from 'react';
import '../styles/DropDownFilterSection.scss';
import {useChecksInputHandler} from '../hooks/ChecksInputHandler';

function DropDownFilterSection(props) {

    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';
    const [changeData, checkedDataString] = useChecksInputHandler(props);
    const [uniqueName] = useState((props.name ? props.name : `unique_${Math.random()}`));

    const toggleDropDown = (e) => {
        e.stopPropagation();
        if (props.isDisplaying && props.onSendCheckedData) {
            props.onSendCheckedData(props.checks);
        }
        if (props.onToggleList) {
            props.onToggleList();
        }
    };

    const hasDataValue = (value) => { //Set check or not to set check
        return props.checks.indexOf(value) !== -1;
    };

    const onChangeData = function (e) {
        changeData(props, e);
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            return <ul className="list-group pr-5">
                {data.map((item) => (
                        <li className="p-1" key={`li_${uniqueName}_${item.id}`}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`${uniqueName}_${item.id}`}
                                    value={item[key]}
                                    name={item[key]}
                                    checked={hasDataValue(item[key])}
                                    onChange={onChangeData}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`${uniqueName}_${item.id}`}
                                    key={`label_${uniqueName}_${item.id}`}
                                >
                                    {item[value]}
                                </label>
                            </div>
                        </li>
                    ),
                )}
            </ul>;
        }
    };

    return (
        <div className={`Filter-section Drop-down-section ${props.className ? props.className : ''}`}>
            <p>
                <i className={`material-icons pointer p-1 toggle_${props.title}`}
                   onClick={toggleDropDown}>{props.isDisplaying ? 'expand_less' : 'expand_more'}</i>
                <span className="Drop-down-section-title mr-2">{props.title}</span>
                <span className="Drop-down-section-row">{checkedDataString}</span>
            </p>
            <div className={`Drop-down-modal ${!props.isDisplaying ? 'd-none' : ''}`}>
                {renderList(props.data)}
            </div>

        </div>
    );
}

export default DropDownFilterSection;
