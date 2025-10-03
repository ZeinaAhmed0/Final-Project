"use client";
import { UseEmpInformationStore } from "@/app/store/UseEmpInformationStore";
import React, { useEffect, useState } from "react";
import Title from "../../common/Title";

function InCome() {
    const { userData, fetchUser } = UseEmpInformationStore();
    const [showIncome, setShowIncome] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [error, setError] = useState("");
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }
    useEffect(() => {
        fetchUser();
    }, []);
    const handleShowIncome = () => {
        if (!selectedMonth) {
            setError("pick a month first");
            setShowIncome(false);
            return;
        }
        setError("");
        setShowIncome(true);
    };
    return (
        <>
            <div className="overflow-x-auto">
                <Title title="my income" bg="bg-[var(--color-primary)]" textColor="text-white" />
                <div className="flex flex-col gap-2 bg-white p-5">
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="monthSelect" className="font-semibold md:text-lg sm:text-sm">
                            pick a month :
                        </label>
                        <select
                            id="monthSelect"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="select w-fit"
                        >
                            {
                                months.map((ele, i) => (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                ))
                            }
                        </select>
                        </div>
                        {error && <p className="text-red-600">{error}</p>}
                        <div className="flex items-center gap-4">
                            <button onClick={handleShowIncome} className="btn md:text-lg sm:text-sm">
                                show my income
                            </button>
                            {showIncome && <span>your income : {userData?.[0]?.salary}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InCome;
