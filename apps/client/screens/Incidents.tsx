"use client"

import { PORT } from "@/lib/constants";
import axios from "axios"
import { useEffect, useState } from "react"


export default function Incidents() {
    const [data, setData] = useState<any>("")

    async function getAllIncidents() {
        try {
            const res = await axios.get(`http://localhost:${PORT}/api/v1/incidents`);
            setData(res.data)
            return res.data

        } catch(e) {
            console.log("Error occured fetching incidents", e)
        }
    }

    useEffect(() => {
        getAllIncidents()
    }, [])


    return <div>
        Incident page

        All incidents are here 

        <div>
            {JSON.stringify(data)}
        </div>
    </div>
}