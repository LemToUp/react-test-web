import React, {useState, useMemo} from 'react';
import '../styles/DropDownFilterSection.scss';

function DropDownFilterSection(props) {

    const [forceUpdateVariable, forceUpdate] = useState(false);
    const [stateData, setStateData] = useState(new Set());
    const key = props.key ? props.key : 'id';
    const value = props.value ? props.value : 'name';

    const toggleDropDown = (e) => {
        e.stopPropagation();
        if (props.isDisplaying && props.onSendCheckedData) {
            props.onSendCheckedData(stateData);
        }
        if (props.onToggleList) {
            props.onToggleList();
        }
    };

    const checkedDataString = useMemo(() => {
        return props.data ? props.data
            .filter(value => stateData.has(value.id))
            .map(value => value.name)
            .join(', ') : '';
    }, [props.data, stateData, forceUpdateVariable]);

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
        <div className="Filter-section Drop-down-section">
            <p>
                <i className="material-icons pointer" onClick={toggleDropDown}>{props.isDisplaying ? 'expand_less' : 'expand_more'}</i>
                <span className="Drop-down-section-title">{props.title}</span>
                <span className="Drop-down-section-row">{checkedDataString}</span>
            </p>
            <div className={`Drop-down-modal ${!props.isDisplaying ? 'd-none' : ''}`}>
                {renderList(props.data)}
            </div>
        </div>
    );
}

export default DropDownFilterSection;
