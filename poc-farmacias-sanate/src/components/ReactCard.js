import React, { useState } from 'react';
import { Box, FormControl, Input, MonthPicker, TextField, YearPicker } from "@mui/material";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import './ReactCard.css';

export default function ReactCard() {

    const [data, setData] = useState({
        cvc: '',
        expiry: '',
        name: '',
        number: '',
    })

    const handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div id="PaymentForm">
            <Cards 
                cvc={data.cvc}
                expiry={data.expiry}
                focus={data.focus}
                name={data.name}
                number={data.number}
            />
            <FormControl action='' className='cardForm'>
                <Input
                    type="text"
                    name="name"
                    placeholder='Your Name'
                    onChange={handleInputChange}
                />
                <Input
                    type="number"
                    name='number'
                    placeholder='Card Number'
                    onChange={handleInputChange}
                />
                <Input
                    type="number"
                    name="cvc"
                    placeholder="CVC"
                    onChange={handleInputChange}
                />
                <Input
                    type="number"
                    name='expiry'
                    placeholder='MM / YY'
                    onChange={handleInputChange}
                />
            </FormControl>
        </div>
    )
}