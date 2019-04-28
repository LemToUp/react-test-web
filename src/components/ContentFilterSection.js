import React from 'react';
import '../styles/ContentFilterSection.scss';
import {useChecksInputHandler} from '../hooks/ChecksInputHandler';

function DropDownFilterSection(props) {

    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';
    const [onChangeData] = useChecksInputHandler(props);

    const hasDataValue = (value) => { //Set check or not to set check
        return props.checks.indexOf(value) !== -1;
    };

    const renderList = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            const uniqueId = Math.random();
            return <ul className="list-group">
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
                                        onChange={onChangeData.bind(this, props)}
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
        <div className={`Filter-section Content-filter-section ${props.className ? props.className : ''}`}>
            {renderList(props.data)}
        </div>
    );
}

export default DropDownFilterSection;
