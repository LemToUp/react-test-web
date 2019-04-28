import {useState, useEffect, useMemo} from 'react';

export function useChecksInputHandler(props) {
    const [forceUpdateVariable, forceUpdate] = useState(false);

    useEffect(
        () => {
            if (!props.checks && props.onSendCheckedData) {
                props.onSendCheckedData([]);
            }
        },
        [],
    );

    const onChangeData = (props, e) => {
        if (e.target.checked) {
            props.checks.push(Number.parseInt(e.target.value)); //Event transform value to a string
            e.target.checked = true; //Toggle input
        } else {
            const index = props.checks.indexOf(Number.parseInt(e.target.value));
            if (index !== -1) {
                props.checks.splice(index, 1); //Remove if founded
            }
            e.target.checked = false; //Toggle input
        }
        forceUpdate(!forceUpdateVariable); //Force update analoque

        if (props.onSendCheckedData) {
            props.onSendCheckedData(props.checks);
        }

        e.stopPropagation();
    };

    const checkedDataString = useMemo(() => { //Generate string from names
        return props.data ? props.data
            .filter(value => props.checks.indexOf(value.id) !== -1)
            .map(value => value.name)
            .join(', ') : '';
    }, [props.data, props.checks, forceUpdateVariable]);

    return [onChangeData, checkedDataString];
}