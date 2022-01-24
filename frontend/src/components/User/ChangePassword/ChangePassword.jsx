import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { changePassword } from "../../../redux/apiRequest";
import { createAxios } from '../../../createInstance';
import './ChangePassword.scss'
import { toast } from "react-toastify";
const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCF, setNewPasswordCF] = useState("");
    const [status, setStatus] = useState();
    const [message, setMessage] = useState("");

    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPasswordCharactorError, setNewPasswordCharactorErrorError] = useState("");
    const [newPasswordCFrror, setNewPasswordCFError] = useState("");

    const [arr, setArr] = useState([false, false, false])
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const setType = (e, setType) => {
        setType(e.target.value)
    }

    const handleNewPassword = (e) => {
        const checkPassword = e.target.value;

        if (checkPassword == '') {

            setNewPasswordError("Không thể bỏ trống mật khẩu mới!");
            setNewPassword(e.target.value);
        } else {

            if (checkPassword.length < 6) {
                setNewPassword(e.target.value);
                setNewPasswordError('');
                setNewPasswordCharactorErrorError("Độ dài tối thiểu 6 ký tự!");
            } else {
                setNewPassword(e.target.value);
                setNewPasswordError('');
                setNewPasswordCharactorErrorError('');
            }
        }
    }

    const handleNewPasswordCF = (e) => {
        const checkPassword = e.target.value;

        if (checkPassword == '') {

            setNewPasswordCFError("Không thể bỏ trống mật khẩu mới !");
            setNewPasswordCF(e.target.value);
        } else {
            setNewPasswordCFError("");
            setNewPasswordCF(e.target.value);
        }
    }

    const API = (obj) => { return obj }
    const checkNewPassword = async () => {
        const new_obj = {
            password,
            newPassword
        }
        if (newPassword !== newPasswordCF) setArr([false, true, false])
        else {
            if (newPassword === '' || newPassword.length < 6 || newPasswordCF === '' || newPassword !== newPasswordCF) {
                if (newPassword === '') {
                    setNewPasswordError('Không thể bỏ trống mật khẩu mới !');
                }
                if (newPasswordCF === '') {
                    setNewPasswordCFError('Không thể bỏ trống xác thực mật khẩu mới !');
                }
                if (newPassword != newPasswordCF) {
                    setNewPasswordCFError('Xác nhận mật khẩu mới không chính xác!');
                }
            } else {
                const pos = await changePassword(user.user.user_id, new_obj, user.token, axiosJWT)
                if (pos == 0) setArr([true, false, false])
                else setArr([false, false, true])
                setPassword('');
                setNewPasswordCF('');
                setNewPassword('');
                if (pos === 2) toast.success("Đổi mật khẩu thành công!");
            }

        }
    }
    useEffect(() => {
        return () => {

        }
    }, []);
    return (
        <>
            <div className="slider1"></div>
            <div className="mother">
                <div className="changePassword">
                    <div className="headLogo">
                        <div className="order_heading">Đổi Mật Khẩu</div>
                    </div>
                    <div className="inputAccount">
                        <div className="text" for="account">Mật khẩu cũ:</div>
                        <input type="password" className="accountIn4" value={password} onChange={(e) => setType(e, setPassword)} placeholder="Vui lòng nhập mật khẩu cũ" ></input>
                    </div>
                    {
                        arr[0] ?
                            <div className="err">Sai mật khẩu</div>
                            :
                            <></>
                    }
                    <div className="inputAccount">
                        <div className="text" for="account">Mật khẩu mới:</div>
                        <input type="password" className="accountIn4" value={newPassword} onChange={(e) => handleNewPassword(e)} placeholder="Nhập mật khẩu mà bạn muốn đổi" ></input>
                        <div className="err">{newPasswordError}</div>
                        <div className="err">{newPasswordCharactorError}</div>
                    </div>
                    <div className="inputAccount">
                        <div className="text" for="account">Xác nhận mật khẩu mới:</div>
                        <input type="password" className="accountIn4" value={newPasswordCF} onChange={(e) => handleNewPasswordCF(e)} placeholder="Nhập mật khẩu dòng trên lần nữa" ></input>
                        <div className="err">{newPasswordCFrror}</div>
                    </div>
                    {
                        arr[1] ?
                            <div className="err">Sai mật khẩu xác nhận</div>
                            :
                            <></>
                    }
                    <div className="footerThisPage">
                        <button className="confirm" onClick={() => checkNewPassword()}>Xác nhận</button>
                    </div>
                    <div className="lastFooter">
                        <label className="forHome"><i class="fas fa-home"></i></label>
                        <Link to="/login" className="linkTo">Quay trờ lại trang chủ</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;