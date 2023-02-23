import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import UserDetailsDisplay from './components/UserDetailsDisplay';
import UserCreate from './components/UserCreate';

function App() {
  

  // const imageHandler = (event) => {
  //   console.log(event.target.files[0]);
  //   setimage(event.target.files[0]);
  //   console.log(image);
  // }

  // const handImageUpdate = async (event) => {
  //   // event.preventDefault();
  //   const fieldName = "HandImage";
  //   const fieldValue = localRecord["HandImage"];
  //   if(!fieldValue){
  //     alert("don't leave any field blank!!!");
  //     return;
  //   }
  //   console.log(fieldName);
  //   console.log(localRecord['HandImage']);
  //   try {
  //     setUpdating(true);
  //     // Send a PATCH request to the server to update the specified field
  //     const data = {};
  //     data[fieldName] = fieldValue;
  //     const response = await axios.patch(`http://localhost:5000/api/userdetails/${phone}`, data);
  //     console.log(response.data);
  //     //Update the local state with the new user details
  //     setrecord(prevUserDetails => ({
  //       ...prevUserDetails,
  //       [fieldName]: fieldValue
  //     }));
  //     console.log("done");
  //   } catch (error) {
  //     console.log("unable to do it");
  //     console.error(error);
  //   } finally{
  //     setUpdating(false);
  //   }
  // };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     let imageUrl = "";
  //     if (image) {
  //       const formData = new FormData();
  //       formData.append("file", image);
  //       formData.append("upload_preset", "presetName");
  //       const dataRes = await axios.post(
  //         "yourUrl",
  //         formData
  //       );
  //       imageUrl = dataRes.data.url;
  //     }

  //     const submitPost = {
  //       image: imageUrl,
  //     };
  //     console.log(selectedCommunity);
  //     await axios.post("http://localhost:3001/store-image", submitPost);
  //   } catch (err) {
  //     err.response.data.msg && setError(err.response.data.msg);
  //   }
  // }

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('image', file);
  //   console.log(formData);
  //   axios.post(`http://localhost:5000/upload/image/${phone}`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }).then(response => {
  //     console.log(response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   });
  // };

  return (
    <div className="App">
        <UserDetailsDisplay/>
      </div>
  );
}

export default App;
