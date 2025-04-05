import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Chart = ({ correctAnswersCount, totalQuestions }) => {
  return (
    <div style={{ width: 300, height: 300, margin: "0 auto" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={[
            { name: "Correct", value: correctAnswersCount },
            { name: "Incorrect", value: totalQuestions - correctAnswersCount },
          ]}
          dataKey="value"
          outerRadius={100}
          label
        >
          <Cell fill="#4caf50" />
          <Cell fill="#f44336" />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Chart;
