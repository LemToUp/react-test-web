import {useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';

export function useChecksInputHandler(props) {
    useEffect(
        () => {
            if (!props.checks && props.onSendCheckedData) {
                props.onSendCheckedData([]);
            }
        },
        [],
    );

    const changeData = (props, e) => {
        let checks = props.checks ? [...props.checks] : [];
        let target = ReactDOM.findDOMNode(e.target);
        if (target) {
            if (target.checked) {
                checks.push(Number.parseInt(e.target.value)); //Event transform value to a string
                e.target.checked = true; //Toggle input
            } else {
                const index = checks.indexOf(Number.parseInt(e.target.value));
                if (index !== -1) {
                    checks.splice(index, 1); //Remove if founded
                }
                e.target.checked = false; //Toggle input
            }
        }

        if (props.onSendCheckedData) {
            props.onSendCheckedData(checks);
        }

        e.stopPropagation();
    };

    const checkedDataString = useMemo(() => { //Generate string from names
        return props.data ? props.data
            .filter(value => props.checks.indexOf(value.id) !== -1)
            .map(value => value.name)
            .join(', ') : '';
    }, [props.data, props.checks]);

    return [changeData, checkedDataString];
}