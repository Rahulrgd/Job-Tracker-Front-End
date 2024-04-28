import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { Colors } from "chart.js";
import { retrieveUsersPostPerDay } from "../api/JobPostApiServices";
import { Chart as ChartJS, ArcElement, Tooltip, LinearScale } from "chart.js";
ChartJS.register(ArcElement, Tooltip, LinearScale);

const User30DayPerformanceChart = () => {
  const [jobPostsDate, setJobPostsDate] = useState([]);
  const [jobPostsPerDay, setJobPostsPerDay] = useState([]);

  const retrieveData = async () => {
    await retrieveUsersPostPerDay()
      .then((response) => {
        // const reversedData = response.data.reverse();
        // setJobPostsDate(reversedData.data.map((item) => item[1]));
        // setJobPostsPerDay(reversedData.data.map((item) => item[0]));
        // const reversedData = response.data.reverse();
        setJobPostsDate(response.data.reverse().map((item) => item[1]));
        setJobPostsPerDay(response.data.map((item) => item[0]));
      })
      .catch((error) => console.error("Error retrieving data:", error));
  };

  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <div className="w-100 overflow-x-auto">
      <Line
        data={{
          labels: jobPostsDate,
          datasets: [
            {
              label: "Dataset 1",
              data: jobPostsPerDay,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default User30DayPerformanceChart;
