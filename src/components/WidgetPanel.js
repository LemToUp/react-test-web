import React, {useState} from 'react';
import { connect } from 'react-redux';

function WidgetPanel(props) {
    //const [value, setValue] = useState(0);
    return (
        <div>

        </div>
    );
}

function mapStateToProps(state) {
    const { filters } = state.filters;
    return {
        filters
    }
}

const connectedWidgetPanel = connect(mapStateToProps)(WidgetPanel);
export default connectedWidgetPanel;
