'use client'
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts'
const colors = ['#E2E2E2', '#F90002']

// https://stackoverflow.com/questions/45723641/recharts-donut-chart-w-two-labels-in-center
function CustomLabel({ value1, value2 }) {
  return (
    <>
      <text
        x={'50%'}
        y={'42%'}
        fill="#3d405c"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        display="flex"
      >
        <tspan fontSize="14">{value1}</tspan>
      </text>
      <text
        x={'60%'}
        y={'55%'}
        fill="#3d405c"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        display="flex"
      >
        <tspan
          alignmentBaseline="middle"
          fontSize="26"
          className="less-tiny-text-inside"
        >
          {value2}
        </tspan>
      </text>
    </>
  )
}

const AreaChartComponent = ({ used }) => {
  const topUp = [
    {
      name: 'remaining',
      amount: (100 - used)
    },
    {
      name: 'used',
      amount: used
    }
  ]
  return (
    <ResponsiveContainer
      style={{
        height: 100,
        width: 100
      }}
    >
      <PieChart
        className="chart"
        data={topUp}
        style={{
          height: 100,
          width: 100
        }}
      >
        <Pie
          data={topUp}
          dataKey="amount"
          outerRadius={80}
          innerRadius={60}
          // fill="#F90002"
          style={{ height: 53, width: 36 }}
        >
          <Label
            width={30}
            position="center"
            content={
              <CustomLabel value1={'Used '} value2={topUp[1].amount + '%'} />
            }
          ></Label>
          {topUp.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
