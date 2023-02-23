import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function UserDetailsDisplay() {
    const [phone, setphone] = useState("");
  const [record, setrecord] = useState();
  const [localRecord, setLocalRecord] = useState({
    name:"",
    DOB:"",
    TOB:"",
    COB:"",
    SOB:"",
    HandImage:""
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showUserDetails, setshowUserDetails] = useState(false);
  const [showBookingSection, setshowBookingSection] = useState(false);
  const [BookBtn, setBookBtn] = useState(true);
  const [BookedBtn, setBookedBtn] = useState(false);
  const [bookingError, setbookingError] = useState(false);
  const [image, setimage] = useState()
  const [file, setFile] = useState(null);

  useEffect(()=>{
    console.log(record);
  },[record])

  //*******************************To fetch user details based on his Phone no. **********************************/
  const btnHandler = async (e) => {
    setLoading(true);
    setUpdating(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/userdetails/${phone}`);
      setrecord(response.data);
      console.log("successfully fetched");
      setLocalRecord({})
      // console.log(record);
    } catch (error) {
      alert(error);
      console.log(error);
    } finally{
      setLoading(false);
      setUpdating(false);
      setshowUserDetails(true);
    }
  }

  //*******************************To Handle update request **********************************/
  const handleUpdate = async (event) => {
    // event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = localRecord[fieldName];
    if(!fieldValue){
      alert("don't leave any field blank!!!");
      return;
    }
    console.log(fieldName);
    console.log(fieldValue);
    try {
      setUpdating(true);
      // Send a PATCH request to the server to update the specified field
      const data = {};
      data[fieldName] = fieldValue;
      const response = await axios.patch(`http://localhost:5000/api/userdetails/${phone}`, data);
      console.log(response.data);
      //Update the local state with the new user details
      setrecord(prevUserDetails => ({
        ...prevUserDetails,
        [fieldName]: fieldValue
      }));
      console.log("done");
    } catch (error) {
      console.log("unable to do it");
      console.error(error);
    } finally{
      setUpdating(false);
    }
  };
  
  const handleBookingUpdate = async (event) => {
    // try {
    //   setUpdating(true);
    //   setBookBtn(!BookBtn);
    //   setBookedBtn(!BookedBtn);
    //   // Send a PATCH request to the server to update the specified field
    //   const data = {};
    //   data['bookingStatus'] = !record['bookingStatus'];  
    //   const response = await axios.patch(`http://localhost:5000/api/userdetails/${phone}`, data);
    //   console.log(response.data);
    //   //Update the local state with the new user details
    //   setrecord(prevUserDetails => ({
    //     ...prevUserDetails,
    //     ['bookingStatus']: !record['bookingStatus']
    //   }));
    //   console.log("done");
    // } catch (error) {
    //   console.log("unable to do it");
    //   console.error(error);
    // } finally{
    //   setUpdating(false);
    // }
    try {
      setUpdating(true);
      setBookBtn(!BookBtn);
      setBookedBtn(!BookedBtn);
      console.log("trying...");
      await axios.post("http://localhost:5000/api/bookingdetails",record).then(()=>{
        console.log("connected!!!!!");
        console.log(record)
      })
    } catch (error) {
      alert("Already Booked!!!");
      console.log(error.response.data);
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

        {/* user details display section */}
        <>
            {
              record &&
              (
              <div className='primeSection'>
                <div className='theading'>
                    <div onClick={()=>(setshowUserDetails(!showUserDetails),
                                        setshowBookingSection(!showBookingSection))}>User Details</div>
                    <div onClick={()=>(setshowUserDetails(!showUserDetails),
                                        setshowBookingSection(!showBookingSection))}>Book a Session</div>
                </div>
                <div className='contentSection'>
                    {updating && <div className='updateLoader'><div className='loader'></div></div>}
                    {showUserDetails && <div style={{width:"100%"}}>
                        {renderInputField('name', 'Name','text')}
                        {renderInputField('DOB','Date of Birth','date')}
                        {renderInputField('TOB','Time of Birth','time')}
                        {renderInputField('COB','City of Birth','text')}
                        {renderInputField('SOB','State of Birth','text')}
                        {/* {renderInputField('HandImage','HandImage','text')} */}
                        <div className='userinputs'>
                              {/* <label>Booking Status</label>
                              <div style={{width:"60%"}}>
                                <input type="file" onChange={imageHandler}/>
                                <button type="button" onClick={handImageUpdate}>Update</button>
                              </div> */}
                              {/* <form onSubmit={handleSubmit}>
                                <input type="file" onChange={handleFileChange} />
                                <button type="submit">Upload</button>
                              </form> */}
                        </div>
                    </div>}
                    {showBookingSection && 
                        (
                          (
                            (BookBtn && <button onClick={handleBookingUpdate}>book</button>)
                          || (BookedBtn && <button onClick={handleBookingUpdate}>booked</button>)
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