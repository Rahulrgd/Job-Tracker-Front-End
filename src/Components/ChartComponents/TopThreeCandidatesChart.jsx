import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, LinearScale } from "chart.js";
import { topThreePerformers } from "../api/ChartApis";
import { generateRandomColor } from "../JavascriptComponents/RandomColors";
ChartJS.register(ArcElement, Tooltip, LinearScale);

const TopThreeCandidatesChart = () => {
  const [userNames, setUserNames] = useState([]);
  const [jobPostsPerDay, setJobPostsPerDay] = useState([]);

  const retrieveData = async () => {
    try {
      const response = await topThreePerformers();
      const extractedUserNames = [];
      const extractedJobPostsPerDay = [];

      response.data.forEach((item) => {
        extractedUserNames.push(item.fullName);
        extractedJobPostsPerDay.push(item.jobPostCount);
      });

      setUserNames(extractedUserNames);
      setJobPostsPerDay(extractedJobPostsPerDay);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="w-auto overflow-x-auto" style={{ height: "15rem" }}>
      <Bar
        style={{ height: "15rem" }}
        data={{
          labels: userNames,
          datasets: [
            {
              label: "Job Posts",
              data: jobPostsPerDay,
              borderColor: generateRandomColor(),
              backgroundColor: generateRandomColor(),
            },
          ],
        }}
      />
    </div>
  );
};

export default TopThreeCandidatesChart;
