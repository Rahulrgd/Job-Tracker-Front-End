import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { allJobPosts } from "../api/JobPostApiServices";
import { Link } from "react-router-dom";

export default function AllJobPostsComponent() {
  const [allJobList, setAllJobList] = useState([]);

  useEffect(() => {
    allJobPosts()
      .then((response) => setAllJobList(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteJobPost = () => {};

  const handleEditJobPost = () => {};

  return (
    <div className="m-5">
      <h1>All Job Posts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {allJobList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.jobTitle}</td>
              <td>{item.companyName}</td>
              <td>{item.jobDescription}</td>
              <td>{item.status}</td>
              <td>{item.jobDate}</td>
              <td>
                {" "}
                <a href={item.jobLink} target="_blank">Link</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
