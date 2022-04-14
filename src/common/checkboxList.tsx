import { ChangeEvent, FC, useCallback } from "react";

interface CheckboxListProps {
    avaliable: string[],
    checked: string[],
    onCheckedChange: (checked: string[]) => void,
}

export const CheckboxList:FC<CheckboxListProps> = ({avaliable, checked, onCheckedChange}) => {

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.value;
        const isSwitchedOn = !checked.includes(checkboxName);

        const newChecked = isSwitchedOn ? [...checked, checkboxName] : checked.filter(x => x !== checkboxName);

        onCheckedChange(newChecked);
    }, [checked, onCheckedChange]);

    const checkboxes = avaliable.map(name => 
        <label key={name}>
            <input type="checkbox" value={name} name={name} checked={checked.includes(name)} onChange={onChange}/>
            <span className="ml-2">{name}</span>
        </label>
    );

    return (
        <>
            {checkboxes}
        </>
    )
}