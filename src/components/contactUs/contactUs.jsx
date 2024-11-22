import "./contactPage.css"; // Include the custom CSS file for styling
import LandNavbar from "../landNav/landNav";
import Footor from "../LandFooter/landFooter";
import React, { useState } from "react";
import "./contactPage.css";
import { baseUrl } from "../../urls/urls";
import { Alert } from "react-bootstrap";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/contact_us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Your message has been sent successfully!");
        alert("Your message has been sent successfully!")
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (

    <>
      <LandNavbar />
      <div className="container-fluid bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center mb-5">We'd love to hear from you! Please fill out the form below to get in touch.</p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Write your message here"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                  </form>
                  {status && <p className="mt-3 text-center">{status}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footor />
    </>

  );
};

export default ContactPage;
