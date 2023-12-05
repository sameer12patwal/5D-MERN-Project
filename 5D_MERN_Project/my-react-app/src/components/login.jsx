import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import Loader from './loader';
import LoginLogo from '../images/5DLogin.svg'
// import { useApi } from '../APIConfig/ApiContext';
import { Icon } from '@iconify/react';

function Login(){

    // const baseUrl = useApi();
    useEffect(()=>{
        if(sessionStorage.getItem('email'))
        {
            // loaderGet();
            navigate("/Dashboard")
        }
        else if(!sessionStorage.getItem('email'))
        {
            navigate("/")
        }
        // navigate("/Dashboard")  
    },[])

    const [success, setSuccess] = useState(false)

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidMobile, setIsValidMobile] = useState(true);

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;
        setEmail(enteredEmail);
    
        // Email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(enteredEmail));
      };

      const handleMobileChange = (e) => {
        const enteredMobile = e.target.value;
        setMobile(enteredMobile);
    
        // Mobile number validation using a regular expression
        const mobileRegex = /^\d{10}$/;
        setIsValidMobile(mobileRegex.test(enteredMobile));
      };

     const navigate = useNavigate();
      
        const loginbtn = async () => {
          try {
            if (firstname.trim() === '' || lastname.trim() === '' || mobile.trim() === '' || email.trim() === '' || password.trim() === '' || city.trim() === '') {
                alert('Please fill in all fields before submitting.');
                return;
              }
              if (!isValidEmail) {
                alert('Please enter a valid email address.');
                return;
              }
              if (!isValidMobile) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
              }
            // setLoading(true);
            const response = await axios.post(`http://localhost:5000/submit-form`, {
              firstname: firstname,
              lastname: lastname,
              email: email,
              mobile: mobile,
              city: city,
              password: password

            });

            


            // navigate("/Dashboard")
            console.log(response.data);
            sessionStorage.setItem('email', email);
            setSuccess(true);
            
            

          } catch (error) {
            console.error('Login failed', error);
            // setLoading(false);
            // setShowErrorPopup(true);
           }
           //finally {
        //     // setLoading(false);
        //   }
        }

        
    function setOk(){
        setSuccess(true);
        navigate("/Dashboard")
    }
       

        
     

    return(
    <>
        {success &&(
            <div className='box-full-popup'>
                <div className="error-popup">
                    <Icon icon="ep:success-filled" className='error-login' />
                    <p className='projectDetailsp redp mt-3 mb-0'>Success</p>
                    <p className='projectDetailsp'>Details Registered Successfully, Press Ok </p>
                    <button className='btn btn-primary' onClick={setOk}>Ok</button>
                </div>
            </div>
        )}

        <section className='login-page'>
            <div className='login-page-up d-flex align-items-center justify-content-center'>
                <img src={LoginLogo} className='image-logo-login' alt='login-logo' />
            </div>
            <div className='login-page-box'>
                <div className='sign-up-form pt-3'>
                    <div className='text-center'>
                       <h3><strong>Sign Up</strong></h3>
                    </div>
                    <div className='form-box'>
                        <form>
                            <div className='d-flex'>
                                <div class="form-group w-100 p-1">
                                    <label>First Name</label>
                                    <input type="text" class="form-control loginBox" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div class="form-group w-100 p-1">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control loginBox" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div class="form-group w-100 p-1">
                                    <label>Mobile No.</label>
                                    <input type="text" class="form-control loginBox" placeholder="Enter Mobile Number" value={mobile} onChange={handleMobileChange}/>
                                </div>
                                <div class="form-group w-100 p-1">
                                    <label>Email</label>
                                    <input type="email" class="form-control loginBox" placeholder="Enter Email" value={email} onChange={handleEmailChange} />
                                </div>
                            </div>
                            <div className='d-flex'>
                               <div class="form-group w-100 p-1">
                                    <label>Password</label>
                                    <input type="password" class="form-control loginBox" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div class="form-group w-100 p-1">
                                    <label>City</label>
                                    <select class="form-control loginBox" value={city} onChange={(e) => setCity(e.target.value)}>
                                       <option value="Pune">Pune</option>
                                       <option value="Mumbai">Mumbai</option>
                                       <option value="Delhi">Delhi</option>
                                       <option value="Banglore">Banglore</option>
                                    </select>
                                </div>
                            </div>
                            <div className='text-center pt-2'>
                               <button type="button" class="btn btn-primary login" onClick={loginbtn}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
   )
}

export default Login