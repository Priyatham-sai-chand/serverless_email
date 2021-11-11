import React, { useState, useEffect } from "react";
import { store } from "react-notifications-component";
const EmailTemplate = () => {

  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [data_loading, setDataLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [sender_email, setSender_Email] = useState("");
  const [bounced_emails, setBouncedEmails] = useState([]);
  const [delivered_emails, setDeliveredEmails] = useState([]);
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

    var emailarray = email.toString().split(",");
    emailarray = emailarray.filter(function (e) { return e });
	async function handleSubmit(e) {
		e.preventDefault();
    emailarray = emailarray.map(value => value.trim())
		if (!email.length) { notifyPopup("error","emails empty","danger"); return;}
		var namearray = name.toString().split(",");
    namearray = namearray.map(value => value.trim())
		if (subject === "") { notifyPopup("error","subject empty","danger"); return;}
		if (html === "") { notifyPopup("error","html empty","danger"); return;}
    if (sender_email === "") { notifyPopup("error", "sender email empty", "danger"); return; }
    //setBouncedEmails([])
    setLoading(true);
   await  fetch("https://slb37ny1bh.execute-api.ap-south-1.amazonaws.com/prod/email_batcher", {
      method: "post",
      body: JSON.stringify({
        "email": emailarray,
        "name": namearray,
        "html": html,
        "subject": subject,
      "senderemail": sender_email
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.length);
        if(result.length)
          result.forEach((value, index) => {
            setBouncedEmails(oldArray => [...oldArray, value.email.slice(2, -2)]);
          });

      })
      //var common = emailarray.filter(x => bouncedarray.indexOf(x) !== -1)
    setLoading(false);
    setDataLoading(true);
  }

  useEffect(() => {

    var bouncedarray = bounced_emails.toString().split(',')
    //bouncedarray = bouncedarray.map(value => value.trim())
    bouncedarray = bouncedarray.filter(function (e) { return e });
          console.log("bounce array ", bouncedarray)
      console.log("bounced array count", bounced_emails.length)
      console.log("email array ", emailarray)
    if (bounced_emails.length !== 0) {
      var common = emailarray.filter(x => !bouncedarray.includes(x))
      console.log("common with bounced array ", common)
    setDeliveredEmails([])
        common.forEach((value, index) => { setDeliveredEmails(oldArray => [...oldArray,value] );
        });
    }
    if(bounced_emails.length === 0 && emailarray.length !== 0){
          console.log(" else bounce array ", bouncedarray)
      console.log(" else bounced array count", bounced_emails.length)
      console.log(" else email array ", emailarray)
    setDeliveredEmails([])
      emailarray.forEach((value, index) => {
        console.log("email with no bounces", value); setDeliveredEmails(oldArray => [...oldArray,value] );
        })
    }
    //if (!bounced_emails.length) { setDeliveredEmails(emailarray); return; }
  },[data_loading])
  useEffect(() => {

          console.log("delivered ", delivered_emails )
  },[delivered_emails])
  return (
    <>
      <div className="container shadow-sm mx-auto ">
      {loading ?
          <>
          <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
          <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
  </div>
          </div>
          </div>
          </> :
          <>
{data_loading ?
        <>

            <div className="row">
        <h1 className="text-center font-weight-bold">
          Sent Details
        </h1>
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Delivered emails</h3>

                    {delivered_emails.length !== 0 ? (<div className="alert alert-success">
                      <ul>
{delivered_emails.map((item,index) =>
  <li key={index}style={{wordWrap: 'break-word'}}>{item} </li>
)}
</ul>

                    </div>) : (<div className="alert alert-info"><h5>No emails sent</h5></div>)}

              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Bounced Emails</h3>
                    {bounced_emails.length !== 0 ? (<div className="alert alert-success">
                      <ul>
{bounced_emails.map((item,index) =>
    <li key={index}style={{wordWrap: 'break-word'}}>{item}</li>
)}
</ul>


                    </div>) : (<div className="alert alert-info"><h5>No bounces</h5></div>)}
              </div>
</div>
            <button className="btn btn-secondary my-5" onClick={() => window.location.reload(false)} >
              send more emails!
            </button>
              </>
              :

              <>
        <h1 className="text-center font-weight-bold">
          Email Template to Recipients
        </h1>
        <div className="container text-center">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                <h3>Enter Email's</h3>
                <h6>xyz@gmail.com,xxyyzz@gmail.com</h6>
                <textarea
                  id="email"
                  rows="10"
                  cols="50"
                  type="text"
                  className="input"
                  placeholder="xyz@gmail.com,xxyyzz@gmail.com"
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
                  placeholder="xyz verma,xyz sharma , john doe"
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
                <h3>Select sender's Email</h3>
                        <select id="sender_email" value={sender_email} onChange={(e) => setSender_Email(e.target.value)}>
                          <option value="" selected> Select an email </option>
  <option key="1" value="Priyatham AWS <priyathamsaichand@gmail.com>" default>Priyatham AWS &lt;priyathamsaichand@gmail.com&gt;</option>
  <option key="2"value="Priyatham MGIT <bpriyathamsaichand_cse180508@mgit.ac.in>">Priyatham MGIT &lt;bpriyathamsaichand_cse180508@mgit.ac.in&gt;</option>
</select>
              </div>

            </div>

            <br />

            <button className="btn btn-primary my-5" type="submit">
              Submit!
            </button>
          </form>
          {bounced_emails}
        </div>
        </>
      }


          </>
        }



      </div>
    </>
  );
};

export default EmailTemplate;
