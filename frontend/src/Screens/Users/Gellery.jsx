import React, { useState, useEffect, useRef } from "react";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../CSS/gallery.css";
import axios from "axios";
function Gellery() {
  const [image, setimage] = useState([]);
  const isAdmin = localStorage.getItem("adminStatus");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const fileInputRef = useRef(null);
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    // Ensure the selected file is of the expected type
    if (!(file instanceof Blob)) {
      console.log("Selected file is not of type Blob");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result);
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const fetchImages = async () => {
    try {
      const response = await axios.post(`${backend}/api/gallery/all`);
      setimage(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage = async (id) => {
    // alert(id);
    try {
      const response = await axios.delete(
        `${backend}/api/gallery/delete/${id}`
      );
      if (response.data.success) {
        alert("Event deleted successfully");
        fetchImages();
      } else {
        alert(response.data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the event");
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post(`${backend}/api/gallery/create`, {
        name: formData.name,
        image: formData.image,
      });
      const data = response.data;
      if (data.success) {
        alert("successfully added to data base");
        fetchImages();
        setFormData({
          name: "",
          image: "",
        });
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <Navbar />

      <div className="gallery_container">
        <div className="gallery_scaffold">
          {isAdmin === "false" || isAdmin === null ? (
            ""
          ) : (
            <div>
              <h1 className="gallery_header">Add an image:</h1>
              <form onSubmit={submit}>
                <input
                  className="event_input_container"
                  type="file"
                  accept="image/*"
                  onChange={convertToBase64}
                />
                {formData.image && (
                  <div className="image_preview">
                    <img
                      src={formData.image}
                      alt="Uploaded Event"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                )}
                <button className="btn" type="submit">
                  Add to gallery
                </button>
              </form>
            </div>
          )}
          <h1 className="gallery_header">Photo Gallery:</h1>
          <div className="image_scaffold">
            {image.length > 0 &&
              image.map((data, index) => (
                <div className="image_container">
                  <div
                    style={{ backgroundImage: `url(${data.image})` }}
                    className="gellery_image"
                  >
                    {isAdmin === "false" || isAdmin === null ? (
                      ""
                    ) : (
                      <div
                        className="image_delete"
                        onClick={() => deleteImage(data._id)}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Gellery;
