import React, { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import axios from "axios";
const EmailTemplate = () => {
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [html, setHtml] = useState("");
  const [subject, setSubject] = useState("");
  const [company_email, setCompany_Email] = useState("");
  const [webinar_link, setWebinarLink] = useState("");

  const notifyPopup = (title,message,type) => {
    store.addNotification({
      title:title ,
      message: message,
      type: type,
      background: "pink",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

	async function handleSubmit(e) {
		e.preventDefault();
		var array = email.toString().split(",");
		if (array == "") { notifyPopup("error","emails empty","danger"); }
		var nameArray = name.toString().split(",");
		if (nameArray == "") { notifyPopup("error","names empty","danger"); }

    console.log(array);
    console.log(company_email);
    fetch("", {
      method: "post",
      headers: { "content-type": "application/json", "Access-Control-Allow-Origin":"*",},
      body: JSON.stringify({
        emailArray: array,
        nameArray,
        template: html,
        subject,
        webinar_link,
        company_email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyPopup("error",result.message,"success");
      });
  }
  return (
    <>
      <div className="container shadow-sm mx-auto ">
        <h1 className="text-center font-weight-bold">
          Email Template to Recipients
        </h1>
        <div className="container text-center">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter Email's</h3>
                <h6>xyz@gmail.com,xxyyzz@cantileverlabs.com</h6>
                <textarea
                  id="email"
                  rows="10"
                  cols="50"
                  type="text"
                  className="input"
                  placeholder="xyz@gmail.com,xxyyzz@cantileverlabs.com"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></textarea>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter Subject</h3>
                <h6>Enter the Subject of the Email!!</h6>
                <textarea
                  id="subject"
                  rows="10"
                  cols="50"
                  type="text"
                  className="input"
                  placeholder="Enter the Subject of the Email!!"
                  name="subject"
                  onChange={(e) => setSubject(e.target.value)}
                ></textarea>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter Names</h3>
                <h6>delimiter is asdf,zxcv</h6>
                <textarea
                  id="name"
                  rows="10"
                  cols="50"
                  type="text"
                  className="input"
                  placeholder="xyz verma,xyz sharma , jhon doe"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                ></textarea>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter Html code</h3>
                <h6>paste the html code</h6>
                <textarea
                  rows="10"
                  cols="50"
                  type="text"
                  className="input"
                  placeholder="Enter the Subject of the Email!!"
                  name="html"
                  id="html"
                  onChange={(e) => setHtml(e.target.value)}
                ></textarea>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter sender's Email</h3>
                <h6>nametodisplay  &lt;email-id&gt;</h6>
                <p>email in angular brackets</p>
                <input
                  type="text"
                  className="input my-4 "
                  placeholder="Enter company email"
                  name="company_email"
                  id="company_email"
                  onChange={(e) => setCompany_Email(e.target.value)}
                />
              </div>

            </div>

            <br />

            <button className="btn btn-primary my-5" type="submit">
              Submit!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
