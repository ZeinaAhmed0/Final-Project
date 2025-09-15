'use client'
import { UseEmpInformationStore } from '@/app/store/UseEmpInformationStore';
import React, { useEffect, useState } from 'react'
import Title from '../common/Title';

function InCome() {
    const { userData, fetchUser  } = UseEmpInformationStore();
    const [showIncome, setShowIncome] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUser ();
    }, []);
    const handleShowIncome = () => {
        if (!selectedMonth) {
            setError('pick a month first');
            setShowIncome(false);
            return;
        }
        setError('');
        setShowIncome(true);
    };

    return (
        <>
            <Title title='my income' bg='bg-sky-700' textColor='text-white' />
            <div className="flex flex-col gap-2 bg-white p-5">
                <div className='flex gap-2 items-center'>
                    <label htmlFor="monthSelect" className="font-semibold">pick a month :</label>
                    <select
                        id="monthSelect"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="select w-fit">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    {error && <p className="text-red-600">{error}</p>}
                <div className="flex items-center gap-4">
                    <button onClick={handleShowIncome} className="btn">show my income</button>
                    {showIncome && (
                        <span>your income : {userData?.[0]?.salary}</span>
                    )}
                </div>
                </div>
                
            </div>
        </>
    )
}

export default InCome;

