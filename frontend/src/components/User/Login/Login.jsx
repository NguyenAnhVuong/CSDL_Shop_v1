import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/apiRequest";
import './Login.scss'
const Login = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const dispatch = useDispatch();
    const handleType = (e, setFunction) => {
        setFunction(e.target.value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        const res = await loginUser(user, dispatch, navigate);
        setErr(res);
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
        return () => {

        }
    }, []);
    return (
        <div className="container">
            <div className="content-page">
                <div className="wrapbox-heading-account">
                    <div className="header-page clearfix">
                        <h1 className="h1_login">Đăng nhập</h1>
                    </div>
                </div>
                <div className="wrapbox-content-account">
                    <div id="customer-login">
                        <div id="login" className="userbox">
                            <form acceptCharset="UTF-8" action="/loginn" id="customer_login" method="post">
                                <input name="form_type" type="hidden" value="customer_login" />
                                <input name="utf8" type="hidden" value="✓" />
                                <div className="clearfix large_form" >
                                    <label htmlFor="customer_email" className="icon-field"><i className="icon-login icon-envelope "></i> </label>
                                    <input required="" type="email" value={email} name="email" id="customer_email" placeholder="Email" className="text" onChange={(e) => handleType(e, setEmail)} />
                                </div>
                                <div className="clearfix large_form" >
                                    <label htmlFor="customer_password" className="icon-field"><i className="icon-login icon-shield"></i></label>
                                    <input required="" type="password" value={password} name="password" id="customer_password" placeholder="Mật khẩu" className="text" size="16" onChange={(e) => handleType(e, setPassword)} />
                                    {err && <p className='err-message'>{err}</p>}
                                    <div className="clearfix action_account_custommer">
                                        <div className="action_bottom button dark">
                                            <input className="btn btn-signin" type="submit" value="Đăng nhập" onClick={(e) => handleLogin(e)} />
                                        </div>
                                        <div className="req_pass">
                                            {/* <a href="#">Quên mật khẩu?</a><br></br> */}
                                            hoặc <Link to="/register">Đăng ký</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
}

export default Login;