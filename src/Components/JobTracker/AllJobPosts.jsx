import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteJobPost, jobPosts } from "../api/JobPostApiServices";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function AllJobPostsComponent() {
  const [list, setList] = useState([]);
  useEffect(() => {
    retriveJobPosts();
  }, []);
  function retriveJobPosts() {
    jobPosts()
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleDeteJobPost = (id) => {
    // deleteJobPost(id).then((response)=>{console.log(response.data)}).catch((error)=>console.log(error))
    deleteJobPost(id)
    console.log("clicked " + id)
  }

  const navigate = useNavigate();

  const handleEditJobPost = (id) => {
    navigate(`/editJobPost/${id}`)
  }
  return (
    <div className="m-5">
      <h1>All Job Posts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>Link</th>
            <th>Delete JobPost</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.jobTitle}</td>
              <td>{item.companyName}</td>
              <td>{item.jobDescription}</td>
              <td>{item.status}</td>
              <td>{item.jobDate}</td>
              <td>{item.jobLink}</td>
              <td>
                <Button variant="danger" onClick={()=>handleDeteJobPost(item.id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button variant="success" onClick={()=>handleEditJobPost(item.id)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
