import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faYahoo } from '@fortawesome/free-brands-svg-icons';
import Background from '../assets/images/bg-01.jpg'
import CaptchaBg from '../assets/images/captcha.jpg'
import { Base_URL } from '../Components/BaseURL';
import { Captcha } from '../Components/Captcha';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login (){
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [captcha, setCaptcha] = useState()
    const [userChaptcha, setUserChaptcha] = useState()

    const navigate = useNavigate()

    const LoginHandler = (evt) => {
        evt.preventDefault()
        // setUserName(evt.target.username)
        // console.log(userName, password)
        axios.get(`${Base_URL}/users?userName=${userName}`)
        .then((response) =>{
            if (response.data.length && response.data[0].password === password) {
                if (userChaptcha === captcha) {
                    navigate('/profile', { state: { userId: response.data[0].id } })
                }
                else{
                    document.getElementById('err').innerHTML ='Sorry, the characters you entered do not match the image. Please try again.'
                    setCaptcha(Captcha().toUpperCase())
                }
            }
            else {
                document.getElementById('err').innerHTML ='Username or Password is incorrect'
                setCaptcha(Captcha().toUpperCase())
            }
        })
    }

    useEffect(()=>{
        setCaptcha(Captcha().toUpperCase())
    }, [])

    return(
        <div style={{backgroundImage: `url(${Background})`, backgroundSize:'100%', height: '100%', width: '100%'}}>
            <div className='container d-flex justify-content-center align-items-center vh-100'>
                <form onSubmit={LoginHandler} className='container mt-3 border' style={{width: '40%', padding: '20px', borderRadius: '10px', background: 'whitesmoke'}}>
                    <h1 className='container d-flex justify-content-center'>Login</h1>
                    <p id='err' className='d-flex justify-content-center' style={{color: 'red'}}></p>
                    <div className='mb-3 mt-3' dataValidate = "Username is reauired">
                        <label for='email' className='form-label'>Username:</label>
                        <div className='input-group d-flex align-items-center'>
                            <FontAwesomeIcon icon={faUser} />
                            <input 
                                type='email' 
                                className='form-control' 
                                id='username' 
                                placeholder='Enter email' 
                                name='username' 
                                onChange={(evt)=>setUserName(evt.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password:</label>
                        <div className='input-group d-flex align-items-center'>
                            <FontAwesomeIcon icon={faLock} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='form-control'
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                onChange={(evt)=>setPassword(evt.target.value)}
                                required
                            />
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={()=>setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='me-2' />
                            </button>
                        </div>
                    </div>
                    <div className='form-check mb-3 d-flex justify-content-end'>
                        <a href='/'>Forgot password?</a>
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
                        <button type='submit' className='btn btn-primary rounded-pill' style={{width: '80%'}}>Login</button>
                    </div>
                    <div className='d-flex justify-content-center' style={{paddingTop: '40px'}}>
                        <p>or continue using</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <a href='/' className='btn btn-danger'>
                            <FontAwesomeIcon icon={faGoogle}/>
                        </a>
                        <a href='/' className='btn btn-info' style={{ marginLeft: '20px' }}>
                            <FontAwesomeIcon icon={faYahoo} />
                        </a>
                    </div>
                    <div className='d-flex justify-content-center align-items-center' style={{paddingTop: '40px'}}>
                        <span style={{fontSize: '16px', marginRight: '10px'}}>Don't have an account? </span>
                        <a href='/register' style={{color: 'red', fontSize: '16px'}}>Register</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login