import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });
  const [twoFactorMode, setTwoFactorMode] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState("");

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
  const clear_error = (err) => {
    const elem = document.querySelector(".form-error-container");
    if (elem) {
      if (global.error_timout) {
        clearTimeout(global.error_timout);
      }
      elem.innerHTML = ``;
    }
  };

  const finishLogin = async () => {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data,  twofatoken: twoFactorMode, twofactor_code: twoFactorCode})
    });

    const jsonRes = await res.json();

    if (jsonRes.ok === false) {
        return error(jsonRes.msg)
    }
    
    if (jsonRes.status === 200) {
        return error(jsonRes.msg)
    }

    const elem = document.querySelector(".form");
    if(elem) {
        elem.innerHTML = `<h1>Login Successfull</h1> <h1>${jsonRes.user.name}</h1> <h2 class="form-message">Redirecting</h2>`;
        setTimeout(() =>{
            navigate("/")
        },2000)
    }
  };

  const handleSubmit = async () => {
    const { username, password } = data;
    if (!username.trim() || !password.trim()) {
      return error("Invalid Login!");
    }

    clear_error();
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    const jsonRes = await res.json();
    if (jsonRes.ok === false) {
        return error(jsonRes.msg)
    }

    setTwoFactorMode(jsonRes["2fa_token"])
  };

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
    <>
      <div className="form-container">
        <div className="form">
          <h1 className="form-title">2FA Login</h1>
          {twoFactorMode ? (
            <>
                <div className="input-group">
                    <span className="placeholder">Two Factor Code</span>
                    <input type="text" className="form-input twofactor" value={twoFactorCode} onChange={handle2faInput} placeholder="2FA Code" inputMode="numeric" pattern="\d*" maxLength={6} autoCapitalize="false" autoComplete="false" spellCheck="false" />
                </div>
                <div className="form-error-container"></div>
                <button className={twoFactorCode.trim().length < 6 ? "form-submit disabled" : "form-submit"} disabled={twoFactorCode.trim().length < 6 ? !0 : !1} onClick={finishLogin}>
                    Login
                </button>
            </>
          ) : (
            <>
                <div className="input-group">
                    <span className="placeholder">Username</span>
                    <input type="text" className="form-input" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                </div>
                <div className="input-group">
                    <span className="placeholder">Password</span>
                    <input type="password" className="form-input" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>
                <div className="form-error-container"></div>
                <button className="form-submit" onClick={handleSubmit}>
                    Login
                </button>
            </>
          )}          
        </div>
      </div>
    </>
  );
};

export default Login;