import React, {useState} from 'react';
import '../styles/ContentFilterSection.scss';
import {useChecksInputHandler} from '../hooks/ChecksInputHandler';

function ContentFilterSection(props) {

    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';
    const className = props.className ? props.className : '';
    const [changeData] = useChecksInputHandler(props);
    const [uniqueName] = useState((props.name ? props.name : `unique_${Math.random()}`));

    const onChangeData = function (e) {
        changeData(props, e);
    };

    const hasDataValue = (value) => { //Set check or not to set check
        return props.checks.indexOf(value) !== -1;
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            return <ul className="list-group">
                {data.map((item) => (
                        <li key={`li_${uniqueName}_${item.id}`}>
                            <div className="checkbox">
                                <label
                                    htmlFor={`${uniqueName}_${item.id}`}
                                    className="pointer"
                                >
                                    <input
                                        type="checkbox"
                                        id={`${uniqueName}_${item.id}`}
                                        value={item[key]}
                                        name={item[key]}
                                        checked={hasDataValue(item[key])}
                                        onChange={onChangeData}
                                        className="mx-1"
                                    />
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
        <div className={`Filter-section Content-filter-section ${className}`}>
            {renderList(props.data)}
        </div>
    );
}

export default ContentFilterSection;
