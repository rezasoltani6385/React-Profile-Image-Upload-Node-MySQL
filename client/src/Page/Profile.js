import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody} from 'react-bootstrap'
import UploadAvatar from './UploadAvatar';

import { Base_URL, Profile_URL } from '../Components/BaseURL'

function Profile() {
  const location = useLocation();

  const userId = location.state.userId

    // const userId = props.userId
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [birthDate, setBirthDate] = useState()
    const [mobile, setMobile] = useState()
    const [city, setCity] = useState()
    const [address, setAddress] = useState()
    const [profilePic, setProfilePic] = useState('avatar.png')
    const [uploadModal, setUploadModal] = useState(false)

    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    axios.get(`${Base_URL}/personal_info?user_id=${userId}`).then((response)=>{
        // console.log(response.data)
        setFirstName(response.data[0].first_name)
        setLastName(response.data[0].last_name)
        setBirthDate(new Date(response.data[0].birth_date).toLocaleDateString(undefined, options))
        setMobile(response.data[0].mobile)
        setCity(response.data[0].city)
        setAddress(response.data[0].address)
        if (response.data[0].profile_pic){
          setProfilePic(response.data[0].profile_pic)
        }
    })


  return (
    <div style={{height: '100%', width: '100%', background: 'whitesmoke'}}>
      <div className='container d-flex justify-content-center vh-100'>
          <form className='container mt-3'>
            <div className='d-flex' style={{marginBottom: '20px'}}>
                <h1 className='justify-content-left'>Profile</h1>
                <img 
                    className='justify-content-right'
                    style={{maxWidth: '20%', marginLeft: 'auto', borderRadius: '50%'}}
                    src={`${Profile_URL}/${profilePic}`}
                    alt='Profile Avatar'
                />
            </div>
            <div className='d-flex'>
                <button 
                    // type='file'
                    className='btn border justify-content-right'
                    style={{marginLeft: 'auto', color: 'green', borderRadius: '10px'}}
                    onClick={(evt)=>{
                      evt.preventDefault()
                      setUploadModal(!uploadModal)}}
                >
                    Upload Profile Photo
                    <FontAwesomeIcon icon={faCamera} style={{marginLeft: '3px'}}/>
                </button>
            </div>
            <br />
            <div>
              <Modal show={uploadModal} onHide ={()=>setUploadModal(false)}>
                <ModalBody>
                  <UploadAvatar userId = {userId} setUploadModal={setUploadModal}/>
                </ModalBody>
              </Modal>
            </div>
            <div className='input-group d-flex align-items-center' >
                <label for='fname' className='form-label' style={{marginRight: '5px'}}>
                  First Name:
                </label>
                <input 
                  type='text' 
                  className='form-control'
                  style={{marginRight: '5px', borderRadius: '10px'}}
                  id='fname'
                  name='fname' 
                  value={firstName}
                  readOnly
                />
                <label for='lname' className='form-label' style={{marginRight: '5px'}}>
                  Last Name:
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='lname'
                  name='lname'
                  value={lastName}
                  readOnly
                />  
            </div>
            <br/>
            <div className='input-group d-flex align-items-center' >
                <label for='birthdate' className='form-label' style={{marginRight: '5px'}}>
                  Date of Birth:
                </label>
                <input 
                  type='text' 
                  className='form-control'
                  style={{marginRight: '5px', borderRadius: '10px'}}
                  id='birthdate'
                  name='birthdate' 
                  value={birthDate}
                  readOnly
                />
                <label for='mobile' className='form-label' style={{marginRight: '5px'}}>
                  Mobile:
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='mobile'
                  name='mobile'
                  value={mobile}
                  readOnly
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
                </label>
                <input 
                  type='text' 
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='city'
                  name='city' 
                  value={city}
                  readOnly
                />
              </div>
              <br />
              <div className='input-group d-flex align-items-center'>
                <label for='address' className='form-label' style={{marginRight: '5px'}}>
                  Additional Address: 
                </label>
                <input 
                  type='text'
                  className='form-control'
                  style={{borderRadius: '10px'}}
                  id='address'
                  name='address'
                  value={address}
                  readOnly
                />
              </div>
          </form>
      </div>
    </div>
  )
}

export default Profile