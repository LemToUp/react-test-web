import React, {useState, useEffect, useMemo} from 'react';
import '../styles/DropDownFilterSection.scss';
import {useChecksInputHandler} from '../hooks/ChecksInputHandler';

function DropDownFilterSection(props) {

    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';
    const [onChangeData, checkedDataString] = useChecksInputHandler(props);

    const toggleDropDown = (e) => {
        e.stopPropagation();
        if (props.isDisplaying && props.onSendCheckedData) {
            props.onSendCheckedData(props.checks);
        }
        if (props.onToggleList) {
            props.onToggleList();
        }
    };

    const hasDataValue = (value) => {
        return props.checks.indexOf(value) !== -1;
    };
    
    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const uniqueId = Math.random();
            return <ul className="list-group pr-5">
                {data.map((item, i) => (
                <li className="p-1" key={`li_${uniqueId}_${i}`}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`${uniqueId}_${i}`}
                            value={item[key]}
                            name={item[key]}
                            checked={hasDataValue(item[key]) ? true : undefined}
                            onChange={onChangeData.bind(this, props)}
                        />
                            <label
                                className="form-check-label"
                                htmlFor={`${uniqueId}_${i}`}
                                key={`label_${uniqueId}_${i}`}
                            >
                                {item[value]}
                            </label>
                    </div>
                </li>
                )
                )}
            </ul>
        }
    };

    return (
        <div className={`Filter-section Drop-down-section ${props.className ? props.className : ''}`}>

                <p>
                    <i className="material-icons pointer p-1" onClick={toggleDropDown}>{props.isDisplaying ? 'expand_less' : 'expand_more'}</i>
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
