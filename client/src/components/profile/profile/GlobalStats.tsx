import userService from "@/services/userService"
import { useEffect, useState } from "react"
import { StatsBarChart } from "./BarChart"
import { StackedBarChart } from "./StackedBarChart"

export const GlobalStats = () => {
    const [stats, setStats] = useState()
    const {startDate, endDate} = {
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date()
    }
    useEffect(() => {
        const fetchStats = async () => {
            const response = await userService.getGlobalStats(startDate, endDate)
            setStats(response)
        }
        fetchStats()
    }, [])
    const data = stats?.map((stat: any) => {
        //parse date to weekday
        return {
            weekday: new Date(stat.date).toLocaleDateString('en-US', { weekday: 'long' }),
            correct: stat.correctAnswers,
            incorrect: stat.incorrectAnswers,
        }
    })
    return (
        <div>
            <div className="flex flex-col gap-4">
                {data && <StackedBarChart chartData={data} />}
            </div>
            <code><pre>{JSON.stringify(stats, null, 2)}</pre></code>
        </div>
    )
}