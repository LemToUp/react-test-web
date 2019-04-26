import React, {useState, useEffect} from 'react';
import '../styles/ContentFilterSection.scss';

function DropDownFilterSection(props) {

    const [forceUpdateVariable, forceUpdate] = useState(false);
    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';

    useEffect(
        () => {
            if (!props.checks && props.onSendCheckedData) {
                props.onSendCheckedData([]);
            }
        },
        [],
    );

    const hasDataValue = (value) => {
        return props.checks.indexOf(value) !== -1;
    };

    const onChangeData = (e) => {
        if (e.target.checked) {
            props.checks.push(Number.parseInt(e.target.value));
            e.target.checked = true;
        } else {
            const index = props.checks.indexOf(Number.parseInt(e.target.value));
            if (index !== -1) {
                props.checks.splice(index, 1);
            }
            e.target.checked = false;
        }
        forceUpdate(!forceUpdateVariable); //Force update analoque

        if (props.onSendCheckedData) {
            props.onSendCheckedData(props.checks);
        }

        e.stopPropagation(true);
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
                                        onChange={onChangeData}
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
        <div className="Filter-section Content-filter-section">
            {renderList(props.data)}
        </div>
    );
}

export default DropDownFilterSection;
