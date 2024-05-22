import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import signUpFeaturesImage from "../StaticFiles/Images/signUpFeatures.jpeg";
import { Col, Row } from "react-bootstrap";

function AboutComponent() {
  return (
    <div className="container p-3">
      <h3>About</h3>
      <br />
      <div>
        <h5>Please! Sign-up to get all the features unlocked</h5>
        <li>
          Use your <b> dummy (or real) gmail </b> to sing-up!
        </li>
        <li>
          To sign-up first go to login page.
        </li>
        <br />
        <h6>Features:</h6>
        <Row md={3}>
          <Col>
              <img
                src={signUpFeaturesImage}
                alt="sing-up-features"
                style={{ width: "18rem" }}
                className="w-100"
              />
          </Col>
        </Row>
        <br />
        <h5> Job-Tracker Web App:</h5>
        <ul>
          <li>
            Job-Tracker Web Application allows user's to manage job applications
            and resumes.
          </li>
          <li>
            User needs to add the job applications (<b>manually for now!</b>).
          </li>
        </ul>
        <br />

        <h5> Why do we need to track our job applications?</h5>
        <ul>
          <li>
            Tracking and Managing job applications has various advantages while
            looking for jobs. I can give you some examples, like:
          </li>
          <li>
            You can monitor yourself, how regular you are applying for jobs.
          </li>
          <li>
            Tracking yourself, gives you the data and helps you to figureout,
            what needs to be improved.
          </li>
          <li>
            You will learn about patterns, that what changes has actully helped in job search.
          </li>
        </ul>
        <br />

        <h5> Why we are creating an app like this?</h5>
        <ul>
          <li>
            Applying 10-20 jobs daily, easily piles-up the number of job
            applications over the period of time.
          </li>
          <li> It's impossible to keep track and manage all these job application within our mind.</li>
          <li>
            I used to use Excel sheet, but always felt that Excel is not the best
            suited app for this purpose.
          </li>
          <li>
            As I needed different features to manage my job applications, which is either missing or was not created for this purpose.
          </li>
          <li>
            So, thats why I want to create an app that specifically solves this problem.
          </li>
        </ul>
        <br />

        <h5> How can this app help us?</h5>
        <ul>
          <li> You can follow similar people like you.</li>
          <li> Which will help you to search jobs more efficiently.</li>
          <li>
            Searching even 10 relevent jobs does easily consumes 2-3 hrs/day. Searching more than
            this easily consume your whole day.
          </li>
          <br />

          <li>
            But following more people like you, will help you to reduce your time and
            effort.
          </li>
          <li>
            Which allows you to invest more in your skills, rather than hunting jobs, whole day.
          </li>
          <li>
            Also it will create a database of companies that you applied. So you can visit back to their carrer page and look for new opportunity.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutComponent;
