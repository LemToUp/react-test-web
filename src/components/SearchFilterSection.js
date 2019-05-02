import React, {useState, useEffect} from 'react';
import '../styles/SearchFilterSection.scss';

export const seachFilterConstants = {
    SEARCH_FILTER_COMPARE_FULL: '**',
    SEARCH_FILTER_COMPARE_PARTICAL: '*_',
    SEARCH_FILTER_COMPARE_BEGINNING_FROM: '""',
};

export const orderFilterConstants = {
    ORDER_FILTER_ALPHABETICAL_UP: 'A-Z',
};

const defaultSortDataValue = {
    searchType: seachFilterConstants.SEARCH_FILTER_COMPARE_FULL,
    search: undefined,
    sort: undefined,
    unique: 'name'
};

function DropDownFilterSection(props) {

    const [isShowPopup, setIsShowPopup] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [forceUpdateVariable, forceUpdate] = useState(false);

    useEffect(
        () => {
            if (props.onSendData) {
                props.onSendData(Object.assign(defaultSortDataValue, props.sortData, {search: ''}));
            }
        },
        [],
    );

    const toggleIsShowPopup = (e) => {
        e.stopPropagation();
        setIsShowPopup(!isShowPopup);
    };

    const changeCurrentFilter = (filterName, e) => {
        e.stopPropagation();
        sendFiltersToParent({searchType: filterName});
        setIsShowPopup(!isShowPopup);
    };

    const sendFiltersToParent = (filters) => {
        if (props.onSendData && props.sortData) {
            props.onSendData(Object.assign(props.sortData, filters));
        }
    };

    const onChangeSearchPhrase = (e) => {
        e.stopPropagation();
        setSearchPhrase(e.target.value);
    };

    const onOrderToggle = (e) => {
        e.stopPropagation();
        sendFiltersToParent({sort: props.sortData.sort ? undefined : orderFilterConstants.ORDER_FILTER_ALPHABETICAL_UP});
        forceUpdate(!forceUpdateVariable);
    };

    const onSendSearchPhrase = (e) => {
        e.stopPropagation();
        sendFiltersToParent({search: searchPhrase});
    };

    const onInputKeyUp = (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            sendFiltersToParent({search: searchPhrase});
        }
    };

    return (
        <div className={`Filter-section Search-filter-section ${props.className ? props.className : ''}`}>
            <div className="input-group mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text p-1">
                        <i className="material-icons pointer" onClick={onSendSearchPhrase}>search</i>
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control p-1"
                    onChange={onChangeSearchPhrase}
                    onKeyPress={onInputKeyUp}
                />
            </div>

            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                <button
                    type="button"
                    className={`btn btn-secondary ${(props.sortData && props.sortData.sort) ? 'active' : ''}`}
                    onClick={onOrderToggle}
                >
                    {orderFilterConstants.ORDER_FILTER_ALPHABETICAL_UP}
                </button>
                <div className="btn-group btn-group-sm" role="group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={toggleIsShowPopup}
                    >
                        {props.sortData ? props.sortData.searchType : ''}
                    </button>
                    <div className="dropdown-menu mt-0" aria-labelledby="btnGroupDrop1"
                         style={{display: isShowPopup ? 'block' : 'none'}}>
                        <button className="dropdown-item py-1 px-2"
                                onClick={changeCurrentFilter.bind(this, seachFilterConstants.SEARCH_FILTER_COMPARE_FULL)}>{seachFilterConstants.SEARCH_FILTER_COMPARE_FULL}</button>
                        <button className="dropdown-item py-1 px-2"
                                onClick={changeCurrentFilter.bind(this, seachFilterConstants.SEARCH_FILTER_COMPARE_PARTICAL)}>{seachFilterConstants.SEARCH_FILTER_COMPARE_PARTICAL}</button>
                        <button className="dropdown-item py-1 px-2"
                                onClick={changeCurrentFilter.bind(this, seachFilterConstants.SEARCH_FILTER_COMPARE_BEGINNING_FROM)}>{seachFilterConstants.SEARCH_FILTER_COMPARE_BEGINNING_FROM}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFilterSection;
