'use client'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Calender() {
    const [value, setValue] = useState(new Date());
    return (
        <div className="p-4 bg-white rounded shadow w-fit">
            <Calendar onChange={setValue} value={value} className="react-calendar"/>
            <div className="mt-2">Selected date: <span className="font-semibold">{value.toLocaleDateString()}</span></div>
        </div>
    )
}

export default Calender