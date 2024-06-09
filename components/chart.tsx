"use client";

import { BarChart, Bar, ResponsiveContainer } from "recharts";

export default function Chart() {
  const userActivity = [
    { date: "6d ago", activeUsers: 100 },
    { date: "5d ago", activeUsers: 200 },
    { date: "4d ago", activeUsers: 300 },
    { date: "3d ago", activeUsers: 400 },
    { date: "2d ago", activeUsers: 500 },
    { date: "1d ago", activeUsers: 600 },
  ];
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart width={600} data={userActivity} height={300}>
        <Bar dataKey="activeUsers" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
