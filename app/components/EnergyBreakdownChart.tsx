'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(
  () => import('recharts').then((recharts) => {
    const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = recharts
    return function Chart({ data }: { data: Array<{ name: string; value: number }> }) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }),
  { ssr: false }
)

interface EnergyBreakdownChartProps {
  data: Array<{ name: string; value: number }>
}

export default function EnergyBreakdownChart({ data }: EnergyBreakdownChartProps) {
  return <Chart data={data} />
} 