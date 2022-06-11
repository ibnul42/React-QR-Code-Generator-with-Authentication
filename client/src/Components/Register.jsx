import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({name: "", username: "", password: ""});
    const [qrLoaded, setQrLoaded] = useState(false);
    // will contain the data while register request
    const [twoFactorMode, setTwoFactorMode] = useState("");
    const [twoFactorCode, setTwoFactorCode] = useState("");

    // const {name, username, password} = data;

    const error = (err) => {
        const elem = document.querySelector(".form-error-container");
        if (elem) {
            if (global.error_timout) {
            clearTimeout(global.error_timout);
            }
            elem.innerHTML = `<span class="form-error">${err}</span>`;
        }

        global.error_timout = setTimeout(() => (elem.innerHTML = ``), 10000);
    };
    const handleSubmit = async () => {
        const { username, password, name } = data;
        if (!name.trim() || !username.trim() || !password.trim()) {
        return error("Fill Proper Credentials");
        }

        if (password.trim().length < 5) {
            return error("Password must be at least 5 characters");
        }

        clear_error();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const jsonRes = await res.json();
        if (jsonRes.status === 200) {
            return error(jsonRes.msg)
        }
        
        if(jsonRes?.status === 101){
            setTwoFactorMode(jsonRes.twofactor)
        }
    };

    const finishRegistration = async () => {
        const res = await fetch('/api/register/finish', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, twofactor_token: twoFactorMode.secret, twofactor_code: twoFactorCode })
        });

        const jsonRes = await res.json();
        
        if (jsonRes.status === 200) {
            return error(jsonRes.msg)
        }

        const elem = document.querySelector(".form");
        if(elem) {
            elem.innerHTML = `<h1>Registration Successfull</h1> <h2 class="form-message">Redirecting</h2>`;
            setTimeout(() =>{
                navigate("/")
            },2000)
        }
    }

    const clear_error = (err) => {
        const elem = document.querySelector(".form-error-container");
        if (elem) {
            if (global.error_timout) {
            clearTimeout(global.error_timout);
            }
            elem.innerHTML = ``;
        }
    };
    const fetchQR = async (url) => {
        const res = await fetch(url);
        const rawData = await res.arrayBuffer();

        function convertToBase64(input) {
            const uInt8Array = new Uint8Array(input);
            const count = uInt8Array.length;

            // Allocate the necessary space up front.
            const charCodeArray = new Array(count);

            // Convert every entry in the array to a character.
            for (let i = count; i >= 0; i--) {
            charCodeArray[i] = String.fromCharCode(uInt8Array[i]);
            }

            // Convert the characters to base64.
            const base64 = btoa(charCodeArray.join(""));
            return base64.toString();
        }

        console.log(convertToBase64(rawData));
        setQrLoaded(`data:image/png;base64,${convertToBase64(rawData)}`);
    };

    if (twoFactorMode) {
        // fetchQR("https://chart.googleapis.com/chart?chs=240x240&chld=L|0&cht=qr&chl=otpauth://totp/TwoFactorAuthenticator%3Ad%3Fsecret=NHYM2O3AXRAMPLRJ3STP6D5XAIPW5UOI%26issuer=TwoFactorAuthenticator");
        fetchQR(twoFactorMode.qr.replace(/166/g, "240"));
    }

    const handle2faInput = (event) => {
    const getFirstNonEmptyValue = (arr) => {
        return arr.filter((e) => !!e?.trim())[0];
    };
    const pressedKey = getFirstNonEmptyValue(event.target.value.split(twoFactorCode));
    if (!pressedKey ? true : !isNaN(parseInt(pressedKey))) {
        setTwoFactorCode(event.target.value.trim());
    }
    };


  return (
    <div className='center'>
        <div className="form-container">
            <div className="form">
                <h1 className="form-title">2FA Registration</h1>
                {twoFactorMode ? (
                    <>
                        <div className="form-qr">
                            {qrLoaded ? <img src={qrLoaded} alt="qrCode" /> : <h1>Loading...</h1>}
                            {/* <img src="https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/TwoFactorAuthenticator%3Aaaa%3Fsecret=ZETTXX2XNINBSYTA4JD2WADK6DXIYWTK%26issuer=TwoFactorAuthenticator" alt="Authentication" /> */}
                        </div>
                        <div className="instructions">
                            <h3>Instructions: </h3>
                            <p>
                            1. Scan the QR Code with any Authenticator App <br />
                            &nbsp;&nbsp;&nbsp;(for eg. Google Authenticator, Microsoft Authenticator).
                            </p>
                            <p>2. Enter the Code here To Finish Registration.</p>
                            <p>Note: The Code is Refreshed Every Minute.</p>
                        </div>
                        <div className="input-group">
                            <span className="placeholder">Two Factor Code</span>
                            <input type="text" className="form-input twofactor" placeholder="2FA Code" inputMode="numeric" value={twoFactorCode} onChange={handle2faInput} maxLength={6} autoCapitalize={false} autoComplete={false} spellCheck={false} />
                        </div>
                        <button className="form-submit" onClick={finishRegistration}>Register</button>
                    </>
                ) : (
                    <>
                        <div className="input-group">
                            <span className="placeholder">Full Name</span>
                            <input type="text" className='form-input' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <span className="placeholder">Username</span>
                            <input type="text" className='form-input' value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <span className="placeholder">Password</span>
                            <input type="text" className='form-input' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                        </div>
                        <div className="form-error-container"></div>
                        <button className="form-submit" onClick={handleSubmit}>Register</button>
                    </>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Register