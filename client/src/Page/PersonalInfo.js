import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'
import Background from '../assets/images/bg-01.jpg'
import CaptchaBg from '../assets/images/captcha.jpg'
import { Base_URL } from '../Components/BaseURL';
import { Captcha } from '../Components/Captcha';
import 'bootstrap/dist/css/bootstrap.min.css'

function PersonalInfo(props) {
    const userName = props.userName
    const password = props.password
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [birthDate, setBirthDate] = useState()
    const [mobile, setMobile] = useState()
    const [city, setCity] = useState()
    const [address, setAddress] = useState()
    const [captcha, setCaptcha] = useState()
    const [userChaptcha, setUserChaptcha] = useState()

    const navigate = useNavigate()

    const HandleSubmit = (evt) =>{
      evt.preventDefault()
      if (userChaptcha === captcha){
        axios.post(`${Base_URL}/users`, {
            userName: userName,
            password: password,
        })
        .then((response)=>{
          const userId = response.data.insertId
          axios.post(`${Base_URL}/personal_info`,{
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            mobile: mobile,
            city: city,
            address: address
          })
          .then((response)=>{
            console.log(response)
            navigate('/home')
          })
          .catch((error)=>console.log(error))
        })
        .catch((error)=>console.log(error))
      }
      else{
        document.getElementById('err').innerHTML ='Sorry, the characters you entered do not match the image. Please try again.'
        setCaptcha(Captcha().toUpperCase())
      }
    }

    useEffect(()=>{
      setCaptcha(Captcha().toUpperCase())
  }, [])


  return (
    <div style={{backgroundImage: `url(${Background})`, backgroundSize:'100%', height: '100%', width: '100%'}}>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
          <form onSubmit={HandleSubmit} className='container mt-3 border' style={{width: '50%', padding: '20px', borderRadius: '10px', background: 'whitesmoke'}}>
            <h1 className='d-flex justify-content-center'>Personal Information</h1>
            <p className='d-flex justify-content-center'>
              All fields marked with
              <span style={{color: 'red', marginLeft: '5px', marginRight: '5px'}}>*</span>
              are mandatory to complete.
            </p>
            <p id='err' className='d-flex justify-content-center' style={{color: 'red'}}></p>
            <div className='input-group d-flex align-items-center' >
                <label for='fname' className='form-label' style={{marginRight: '5px'}}>
                  First Name:
                  <span style={{color: 'red'}}> *</span>
                </label>
                <input 
                  type='text' 
                  className='form-control'
                  style={{marginRight: '5px', borderRadius: '10px'}}
                  id='fname'
                  name='fname' 
                  placeholder='Enter First Name'
                  maxLength={50}
                  onChange={(evt)=>setFirstName(evt.target.value)}
                  required
                />
                <label for='lname' className='form-label' style={{marginRight: '5px'}}>
                  Last Name:
                  <span style={{color: 'red'}}> *</span>
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='lname'
                  name='lname'
                  placeholder='Enter Last Name'
                  maxLength={50}
                  onChange={(evt)=>setLastName(evt.target.value)}
                  required
                />
            </div>
            <br/>
            <div className='input-group d-flex align-items-center' >
                <label for='birthdate' className='form-label' style={{marginRight: '5px'}}>
                  Date of Birth:
                  <span style={{color: 'red'}}> *</span>
                </label>
                <input 
                  type='date' 
                  className='form-control'
                  style={{marginRight: '5px', borderRadius: '10px'}}
                  id='birthdate'
                  name='birthdate' 
                  placeholder='Enter Date of Birth'
                  onChange={(evt)=>setBirthDate(evt.target.value)}
                  required
                />
                <label for='mobile' className='form-label' style={{marginRight: '5px'}}>
                  Mobile:
                  <span style={{color: 'red'}}> *</span>
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='mobile'
                  name='mobile'
                  placeholder='Enter Mobile Number'
                  maxLength={11}
                  onChange={(evt)=>setMobile(evt.target.value)}
                  required
                />
            </div>
            <br />
            <div>
              <label>Address:</label>
            </div>
            <br/>
            <div className='input-group d-flex align-items-center' >
                <label for='city' className='form-label' style={{marginRight: '5px'}}>
                  City:
                  <span style={{color: 'red'}}> *</span>
                </label>
                <input 
                  type='text' 
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='city'
                  name='city' 
                  placeholder='Enter City/Town'
                  maxLength={50}
                  onChange={(evt)=>setCity(evt.target.value)}
                  required
                />
              </div>
              <br />
              <div className='input-group d-flex align-items-center'>
                <label for='address' className='form-label' style={{marginRight: '5px'}}>
                  Additional Address: 
                  {/* <span style={{color: 'red'}}> *</span> */}
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='address'
                  name='address'
                  placeholder='Enter Additional Address'
                  maxLength={250}
                  onChange={(evt)=>setAddress(evt.target.value)}
                  
                />
              </div>
              <div className='row' style={{marginBottom: '30px', marginTop: '30px'}}>
                <div className='col-sm-3'></div>
                <div className='col-sm-1 d-flex align-items-center'>
                        <FontAwesomeIcon icon={faSyncAlt} onClick={()=>setCaptcha(Captcha())} style={{color: 'blue'}}/>
                </div>
                <div 
                    id="image"
                    className='col-sm-4 d-flex justify-content-center'
                    style={{
                        userSelect: 'none',
                        background: `url(${CaptchaBg})`,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        backgroundSize: '100% ',
                        backgroundRepeat: 'no-repeat',
                        font: 'bold 20px/1 sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '5px',
                        color: '#555',
                    }}
                    onClick={()=>setCaptcha(Captcha())}
                >
                    {captcha}
                </div>
              </div>
              <div className='d-flex justify-content-center mb-4' style={{marginBottom: '40px'}}>
                  <input 
                      type='text'
                      id='userCaptcha'
                      name='userCaptcha'
                      className='form-control text-center'
                      style={{ maxWidth: '300px', fontSize: '16px', fontWeight: 'normal', borderRadius: '10px' }}
                      placeholder='Type the characters you see'
                      maxLength={6}
                      onChange={(e)=>setUserChaptcha(e.target.value.toUpperCase())}
                  >
                  </input>
              </div>
              <div className='d-flex justify-content-center'>
                  <button type='submit' className='btn btn-primary rounded-pill' style={{width: '80%', marginTop: '25px'}}>Submit</button>
              </div>
              <div className='form-check mb-3 d-flex justify-content-end' style={{marginTop: '45px'}}>
                  <a href='/'>Back to Homepage</a>
              </div>
          </form>
      </div>
    </div>
  )
}

export default PersonalInfo