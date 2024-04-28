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

  const retrieveData = () => {
    retrieveUsersPostPerDay()
      .then((response) => {
        setJobPostsDate(response.data.map((item) => item[1]));
        setJobPostsPerDay(response.data.map((item) => item[0]));
        // const labels = response.data.map((item) => item[1]); // Assuming dates are the labels
        // const datasetData = response.data.map((item) => item[0]);
        // console.log(response.data);
      })
      .catch((error) => console.error("Error retrieving data:", error));
  };

  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <div className="App">
      <Line
        data={{
          // labels: [
          //   "TI",
          //   "ADI",
          //   "Renesas",
          //   "Qualcomm",
          //   "Apple",
          //   "Huawei",
          //   "Cirrus",
          // ],
          labels: jobPostsDate,
          datasets: [
            {
              label: "Dataset 1",
              // data: [2, 4, 6, 4 * 2, 5 * 2, 6 * 2, 14],
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
