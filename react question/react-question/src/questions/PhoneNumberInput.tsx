
import React, { useState } from 'react';
export function PhoneNumberInput() {
    // your code here
    const [value, setValue] = useState('');
    const inputChange = (event: any) => {
        let str = event.target.value.replace(/\D/g, '').slice(0, 10);

        if (str.length >= 7) {
            str = `(${str.slice(0, 3)})${str.slice(3, 6)}-${str.slice(6)}`
        }
        if (str.length > 3 && str.length < 7) {
            str = `(${str.slice(0, 3)})${str.slice(3)}`;
        }
        setValue(str);
    }


    return <input data-testid="phone-number-input" value={value} onChange={inputChange} />
}
