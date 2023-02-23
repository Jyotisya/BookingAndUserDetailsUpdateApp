import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import { FiCamera } from "react-icons/fi";

function UserDetailsDisplay() {
  const [phone, setphone] = useState("-1");
  const [record, setrecord] = useState();
  const [localRecord, setLocalRecord] = useState({
    name:"",
    DOB:"",
    TOB:"",
    COB:"",
    SOB:"",
    image:"",
    cloudinaryID:""
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showUserDetails, setshowUserDetails] = useState(false);
  const [showBookingSection, setshowBookingSection] = useState(false);
  const [BookBtn, setBookBtn] = useState(true);
  const [BookedBtn, setBookedBtn] = useState(false);
  const [userNotFound, setuserNotFound] = useState(false)
  useEffect(()=>{
    console.log(record);
  },[record])

  //*******************************To fetch user details based on his Phone no. **********************************/
  const btnHandler = async (e) => {
    setuserNotFound(false);
    setLoading(true);
    setUpdating(true);
    setrecord({});
    try {
      const response = await axios.get(`http://localhost:3001/${phone}`);
      setrecord(response.data);
      console.log("successfully fetched");
      setLocalRecord({})
      // console.log(record);
    } catch (error) {
      setuserNotFound(true);
      // alert(error);
      console.log(error);
    } finally{
      setLoading(false);
      setUpdating(false);
      setshowUserDetails(true);
    }
  }

  //*******************************To Handle update request **********************************/
  const handleUpdate = async (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = localRecord[fieldName];
    if (event.target.name === 'image') {
      // const file = fieldValue;
      console.log("you are uploading an image")
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      try {
        setUpdating(true);
        const response = await axios.patch(`http://localhost:3001/${phone}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        setrecord(prevUserDetails => ({
          ...prevUserDetails,
          [fieldName]: response.data.image
        }));
      } catch (error) {
        console.log("unable to do it");
        console.error(error);
      } finally {
        setUpdating(false);
      }
    } else {
      if (!fieldValue) {
        alert("don't leave any field blank!!!");
        return;
      }
      console.log(fieldName);
      console.log(fieldValue);
      try {
        setUpdating(true);
        const data = {};
        data[fieldName] = fieldValue;
        const response = await axios.patch(`http://localhost:3001/${phone}`, data);
        console.log(response.data);
        setrecord(prevUserDetails => ({
          ...prevUserDetails,
          [fieldName]: fieldValue
        }));
        console.log("done");
      } catch (error) {
        console.log("unable to do it");
        console.error(error);
      } finally {
        setUpdating(false);
      }
    }
  };
  
  
  
  const handleBookingUpdate = async (event) => {
    try {
      setUpdating(true);
      setBookBtn(!BookBtn);
      setBookedBtn(!BookedBtn);
      console.log("trying...");
      await axios.post("http://localhost:3001/bookingdetails",record).then(()=>{
        console.log("connected!!!!!");
        console.log(record)
      })
    } catch (error) {
      setBookBtn(!BookBtn);
      setBookedBtn(!BookedBtn);
      alert("Already Booked!!!");
      console.log(error);
      //toast.error(error.message);
    } finally{
      setUpdating(false);
    }
  };

  
  //*******************************To dynamically render all user detail fields **********************************/
  const renderInputField = (fieldName, label,type) => {
    return (
      <div className='userinputs'>
        <label >{label}:</label>
        <div style={{display:"flex"}}>
            <input type="text" name={fieldName} value={record[fieldName] || ''}/>
            <input type={type} name={fieldName} onChange={e=>setLocalRecord({...localRecord,[fieldName]:e.target.value})}/>
            <button type="button" name={fieldName} onClick={handleUpdate}>Update</button>
          </div>
      </div>
    );
  };

  //*******************************To Handle onChange of input tags **********************************/
  const handleChange = (event) => {
    setLocalRecord({ ...localRecord, [event.target.name]: event.target.value });
  };


  return (
    <div>
        {/* enter phone detail section */}

        <div style={{width:"50%",height:"100%",padding:"1%",margin:"5% auto"}}>
        <div className='inputPhoneDetailSection'>
            <input onChange={e=>{setphone(e.target.value)}} placeholder="enter phone number!"/>
            <button onClick={btnHandler}>Submit</button>
        </div>
        {userNotFound && (<div style={{margin:"10% auto",display:"flex",justifyContent:"center"}}>
          <h2 style={{color:'red',margin:"auto"}}>Sorry, No user with that Phone no.</h2>
        </div>)}
        {/* user details display section */}
        <>
            {
              record &&
              (
              <div className='primeSection'>
                <div className='theading'>
                    <h3 onClick={()=>(setshowUserDetails(true),
                                        setshowBookingSection(false))}>User Details</h3>
                    <h3 onClick={()=>(setshowUserDetails(false),
                                        setshowBookingSection(true))}>Book a Session</h3>
                </div>
                <div className='contentSection'>
                    {updating && <div className='updateLoader'><div className='loader'></div></div>}
                    {showUserDetails && <div style={{width:"100%"}}>
                        {renderInputField('name', 'Name','text')}
                        {renderInputField('DOB','Date of Birth','date')}
                        {renderInputField('TOB','Time of Birth','time')}
                        {renderInputField('COB','City of Birth','text')}
                        {renderInputField('SOB','State of Birth','text')}
                        <div className='userinputs'>
                          <label >Hand Image:</label>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1%"}}>
                            <div style={{display:"flex",justifyContent:"center",flexGrow:"1"}}>
                              <Image style={{width:"100px"}}
                                  cloudName="dgcgwda0j"
                                  publicId={record.image}/>
                              </div>
                              <div style={{flexGrow:"1"}}>
                              <label style={{cursor:"pointer",
                                border:"none",height:"30px",
                                backgroundColor:"lightcoral",color:"white",
                                display:"flex",justifyContent:"space-around",alignItems:"center",
                                borderRadius:"5px"
                              }}>
                                <FiCamera/>
                                Select Image
                              <input style={{display:"none"}} type="file" name="image" onChange={handleUpdate}/>
                              </label>
                              </div>
                            </div>
                        </div>
                    </div>}
                    {showBookingSection && 
                        (
                          (
                            (BookBtn && <label style={{color:"white",width:"100px",height:"50px",backgroundColor:"skyblue",display:"flex",justifyContent:"center",
                            alignItems:"center",borderRadius:"10px"}}>
                              Book
                              <button style={{display:"none"}} onClick={handleBookingUpdate}></button>
                              </label>)
                          || (BookedBtn && <label style={{color:"white",width:"100px",height:"50px",backgroundColor:"green",display:"flex",justifyContent:"center",
                          alignItems:"center",borderRadius:"10px"}}>
                            Booked
                            <button style={{display:"none"}} onClick={handleBookingUpdate}></button>
                            </label>)
                          )
                        
                        )}
                </div>
                </div>
                )
            }
        </>
        </div>
    </div>
  )
}

export default UserDetailsDisplay