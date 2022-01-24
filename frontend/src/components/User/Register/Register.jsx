
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../../redux/apiRequest';
import './Register.scss'
const Register = () => {
    const [user_name, setUserName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user_nameError, setUser_nameError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCharactorError, setPasswordCharactorError] = useState("");

    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserName = (e) => {
        const user_name = e.target.value;
        if (user_name === '') {
            setUser_nameError("Không thể bỏ trống họ và tên !");
            setUserName(e.target.value);
        } else {
            if (user_name.length < 6) {
                setUser_nameError("Họ và tên cần lớn hơn 6 ký tự !");
                setUserName(e.target.value);
            } else {
                setUserName(e.target.value);
                setUser_nameError('');
            }
        }

    }

    const handleBirthday = (e) => {
        setBirthday(e.target.value);
        setBirthdayError('');
    }

    const handleGender = (e) => {
        setGender(e);
        setGenderError('');
    }

    const handleEmail = (e) => {
        const checkEmail = e.target.value;

        if (checkEmail == '') {

            setEmailError("Không thể bỏ trống email !");
            setEmail(e.target.value);
        } else {

            if (!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(checkEmail)) {
                setEmailError("Email sai định dạng !");
                setEmail(e.target.value);
            } else {
                setEmail(e.target.value);
                setEmailError('');
            }
        }

    }

    const handlePassword = (e) => {
        const checkPassword = e.target.value;

        if (checkPassword == '') {

            setPasswordError("Không thể bỏ trống mật khẩu !");
            setPassword(e.target.value);
        } else {

            if (checkPassword.length < 6) {
                setPassword(e.target.value);
                setPasswordError('');
                setPasswordCharactorError("Độ dài tối thiểu 6 ký tự!")
            } else {
                setPassword(e.target.value);
                setPasswordError('');
                setPasswordCharactorError('');
            }
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (birthday == '' || gender == '' || user_name == '' || email == '' || password == '') {
            if (birthday == '') {
                setBirthdayError('Không thể bỏ trống ngày sinh !');
            }
            if (gender == '') {
                setGenderError('Không thể bỏ trống giới tính !');
            }
            if (user_name == '') {
                setUser_nameError('Không thể bỏ trống họ và tên !');
            }
            if (email == '') {
                setEmailError('Không thể bỏ trống email !');
            }
            if (password == '') {
                setPasswordError('Không thể bỏ trống mật khẩu !');
            }
        } else {

            const newUser = {
                user_name,
                gender,
                birthday,
                email,
                password
            };
            console.log(newUser);
            const res = await registerUser(newUser, dispatch, navigate);
            setErr(res);
            if (!res) {
                toast.success('Đăng ký thành công!');

            }
        }
    }



    useEffect(() => {
        return () => {

        }
    }, []);
    return (
        <div className="container">

            <div className="content-page">
                <div className="wrapbox-heading-account">
                    <div className="header-page clearfix">
                        <h1 className="h1_register">Tạo tài khoản</h1>
                    </div>
                </div>
                <div className="wrapbox-content-account">
                    <div id="customer-login">
                        <div id="login" className="userbox">
                            <form acceptCharset="UTF-8" id="customer_login" method="post">
                                <input name="form_type" type="hidden" value="customer_login" />
                                <input name="utf8" type="hidden" value="✓" />
                                <div className="clearfix large_form">
                                    <label htmlFor="user_name" className="label icon-field"><i className="icon-login icon-user "></i></label>
                                    <input id="user_name" required type="text" value={user_name} name="user_name" placeholder="Họ và tên" className="text" size="30"
                                        onChange={(e) => handleUserName(e)}
                                    />
                                    <div className='err-message'>{user_nameError}</div>
                                </div>

                                <div id="gender" className="clearfix large_form">
                                    <input id="radio1" type="radio" value="Nữ" name="gender" onClick={() => handleGender("Nữ")} />
                                    <label htmlFor="radio1">Nữ</label>
                                    <input id="radio2" type="radio" value="Nam" name="gender" onClick={() => handleGender("Nam")} />
                                    <label htmlFor="radio2">Nam</label>
                                    <div className='err-message large-margin'>{genderError}</div>
                                </div>


                                <div id="birthday" className="clearfix large_form">
                                    <label htmlFor="birthday" className="label icon-field"><i className="icon-login icon-envelope "></i></label>
                                    <input
                                        required
                                        type="date"
                                        value={birthday}
                                        placeholder="mm/dd/yyyy"
                                        name="birthday"
                                        id="birthday"
                                        className="text"
                                        size="30"
                                        onChange={(e) => handleBirthday(e)}
                                    />
                                    <div className='err-message'>{birthdayError}</div>
                                </div>
                                <div id="email" className="clearfix large_form">
                                    <label htmlFor="email" className="label icon-field"><i className="icon-login icon-envelope "></i></label>
                                    <input
                                        required
                                        type="email"
                                        value={email}
                                        placeholder="Email"
                                        name="email"
                                        id="email"
                                        className="text"
                                        size="30"
                                        onChange={(e) => handleEmail(e)}

                                    />
                                    <div className='err-message'>{emailError}</div>

                                </div>
                                <div id="password" className="clearfix large_form">
                                    <label htmlFor="password" className="label icon-field"><i className="icon-login icon-shield "></i></label>
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        placeholder="Mật khẩu"
                                        name="password"
                                        id="password"
                                        className="password text"
                                        size="30"
                                        onChange={(e) => handlePassword(e)}
                                    />
                                    <div className='err-message'>{passwordError}</div>
                                    {"\n"}
                                    <p className='charactor-error'>{passwordCharactorError}</p>
                                </div>
                                <div className='err-message'>{err}</div>

                                <div className="clearfix action_account_custommer">
                                    <div className="action_bottom button dark" id="register">
                                        <input className="btn" type="submit" value="Đăng ký" onClick={(e) => handleRegister(e)} />
                                    </div>
                                </div>
                                <div className="clearfix req_pass">
                                    <Link className="come-back" to="/"><i className="fa fa-reply"></i> Quay lại trang chủ</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;