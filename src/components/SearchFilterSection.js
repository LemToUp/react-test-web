import React, {useState, useMemo} from 'react';
import '../styles/DropDownFilterSection.scss';

function DropDownFilterSection(props) {


    return (
        <div className="Drop-down-section">
            <i className="material-icons pointer">expand_less</i>
            <span>Search</span>

        </div>
    );
}

export default DropDownFilterSection;
