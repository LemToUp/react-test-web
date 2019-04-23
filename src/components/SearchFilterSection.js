import React, {useState} from 'react';
import '../styles/SearchFilterSection.scss';

function DropDownFilterSection(props) {

    const [isShowPopup, setIsShowPopup] = useState(false);
    const [searchType, setCurrentSearchType] = useState('**');
    const [searchValue, setSearchValue] = useState(undefined);
    const [sortType, setSortType] = useState(undefined);

    const toggleIsShowPopup = (e) => {
        e.stopPropagation(isShowPopup);
        setIsShowPopup(!isShowPopup);
    };

    const changeCurrentFilter = (filterName) => {
        setCurrentSearchType(filterName);
        sendFiltersToParent();
        setIsShowPopup(!isShowPopup);
    };

    const sendFiltersToParent = () => {
        if (props.onSendData) {
            props.onSendData({
                'searchType': searchType,
                'search': searchValue,
                'sort': sortType
            });
        }
    };

    const onChangeSeatchPhrase = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="Filter-section Search-filter-section">
            <div className="input-group mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="material-icons pointer" onClick={sendFiltersToParent}>search</i>
                    </span>
                </div>
                <input type="text" className="form-control" onChange={onChangeSeatchPhrase}/>
            </div>

            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                <button type="button" className="btn btn-secondary">A-Z</button>

                <div className="btn-group btn-group-sm" role="group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={toggleIsShowPopup}
                    >
                        {searchType}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" style={{display: isShowPopup ? 'block' : 'none'}}>
                        <button className="dropdown-item" onClick={changeCurrentFilter.bind(this, '**')}>**</button>
                        <button className="dropdown-item" onClick={changeCurrentFilter.bind(this, '*_')}>*_</button>
                        <button className="dropdown-item" onClick={changeCurrentFilter.bind(this, '""')}>""</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFilterSection;
