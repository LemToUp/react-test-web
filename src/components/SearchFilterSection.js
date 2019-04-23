import React from 'react';
import '../styles/SearchFilterSection.scss';

function DropDownFilterSection(props) {
    return (
        <div className="Filter-section Search-filter-section">
            <div className="input-group mb-1">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="material-icons pointer">search</i>
                    </span>
                </div>
                <input type="text" className="form-control"/>
            </div>

            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                <button type="button" className="btn btn-secondary">A-Z</button>

                <div className="btn-group btn-group-sm" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <button className="dropdown-item">Full match</button>
                        <button className="dropdown-item">Partical match</button>
                        <button className="dropdown-item">Begining from</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownFilterSection;
