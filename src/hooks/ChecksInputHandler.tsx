import {ChangeEvent, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';

export interface ChecksInputPropsInterface {
    data: any[],
    checks: number[],
    name: string,
    className?: string,
    onSendCheckedData: any,
    key?: string,
    value?: string,
}

export function useChecksInputHandler(props: ChecksInputPropsInterface): any {
    useEffect(
        () => {
            if (!props.checks && props.onSendCheckedData) {
                props.onSendCheckedData([]);
            }
        },
        [],
    );

    const changeData = (props: ChecksInputPropsInterface, e: ChangeEvent<HTMLInputElement>) => {
        let checks = props.checks ? [...props.checks] : [];
        let target = ReactDOM.findDOMNode(e.target);
        if (target) {
            if (target.checked) {
                checks.push(Number.parseInt(target.value)); //Event transform value to a string
                target.checked = true; //Toggle input
            } else {
                const index = checks.indexOf(Number.parseInt(target.value));
                if (index !== -1) {
                    checks.splice(index, 1); //Remove if founded
                }
                target.checked = false; //Toggle input
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