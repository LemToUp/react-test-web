import React, {useState} from 'react';
import '../styles/ContentFilterSection.scss';

function DropDownFilterSection(props) {

    const [forceUpdateVariable, forceUpdate] = useState(false);
    const [stateData, setStateData] = useState(new Set());
    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';

    const hasDataValue = (value) => {
        return stateData.has(value);
    };

    const onChangeData = (e) => {
        if (e.target.checked) {
            stateData.add(Number.parseInt(e.target.value));
            e.target.checked = true;
        } else {
            stateData.delete(Number.parseInt(e.target.value));
            e.target.checked = false;
        }
        setStateData(stateData);
        forceUpdate(!forceUpdateVariable); //Force update analoque

        if (props.onSendCheckedData) {
            props.onSendCheckedData(stateData);
        }

        e.stopPropagation(stateData);
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
