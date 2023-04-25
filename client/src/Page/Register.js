import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Background from '../assets/images/bg-01.jpg'
import CaptchaBg from '../assets/images/captcha.jpg'
import { Base_URL } from '../Components/BaseURL';
import { Captcha } from '../Components/Captcha';
import PersonalInfo from './PersonalInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [regDone, setRegDone] = useState(false)
    const [captcha, setCaptcha] = useState()
    const [userChaptcha, setUserChaptcha] = useState()

    const HandleRegister = (evt) =>{
        evt.preventDefault()
        console.log(userName, password, confirmPassword)
        if (userChaptcha === captcha){
            if (password === confirmPassword) {
                axios.get(`${Base_URL}/users?userName=${userName}`)
                .then((response) =>{
                    if (response.data.length) {
                        document.getElementById('err').innerHTML ='You already have an account. Please return to the homepage and log in.'
                        setCaptcha(Captcha().toUpperCase())
                    }
                    else {
                        setRegDone(true)
                    }
                })
            }
            else{
                document.getElementById('err').innerHTML = 'Passwords do not match. Please make sure your password and confirmation password are the same.'
                setCaptcha(Captcha().toUpperCase())
            }
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
    <div>
        {regDone ? (
            <PersonalInfo userName = {userName} password = {password}/>
        ) : (
            <div style={{backgroundImage: `url(${Background})`, backgroundSize:'100%', height: '100%', width: '100%'}}>
                <div className='container d-flex justify-content-center align-items-center vh-100'>
                    <form onSubmit={HandleRegister} className='container mt-3 border' style={{width: '50%', padding: '20px', borderRadius: '10px', background: 'whitesmoke'}}>
                        <h1 className='d-flex justify-content-center'>Register</h1>
                        <p id='err' className='d-flex justify-content-center' style={{color: 'red'}}></p>
                        <div className='mb-3 mt-3' >
                            <label for='email' className='form-label'>E-Mail:</label>
                            <input type='email' className='form-control' id='username' placeholder='Enter email' name='username' onChange={(evt)=>setUserName(evt.target.value)}/>
                        </div>
                        <div className='mb-3 mt-3' >
                            <label for='password' className='form-label'>Password:</label>
                            <div className='input-group'>
                                <input type={showPassword ? 'text' : 'password'} className='form-control' id='password' placeholder='Enter password' name='password' onChange={(evt)=>setPassword(evt.target.value)}/>
                                <button
                                    className='btn btn-outline-secondary'
                                    type='button'
                                    onClick={()=>setShowPassword(!showPassword)}
                                    >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} lassName='me-2'/>
                                </button>
                            </div>
                        </div>
                        <div className='mb-3 mt-3' >
                            <label for='Confirm Password' className='form-label'>Confirm Password:</label>
                            <div className='input-group'>
                                <input type={showConfirmPassword ? 'text' : 'password'} className='form-control' id='confirmPassword' placeholder='Retype password' name='password' onChange={(evt)=>setConfirmPassword(evt.target.value)}/>
                                <button
                                    className='btn btn-outline-secondary'
                                    type='button'
                                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEye : faEyeSlash}
                                        className='me-2'
                                    />
                                </button>
                            </div>
                        </div>
                        <div className='row' style={{marginBottom: '30px'}}>
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
                            <button type='submit' className='btn btn-primary rounded-pill' style={{width: '80%', marginTop: '25px'}}>Register</button>
                        </div>
                        <div className='form-check mb-3 d-flex justify-content-end' style={{marginTop: '45px'}}>
                            <a href='/'>Back to Homepage</a>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  )
}

export default Register