import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';
import moment from 'moment';
import { createAxios } from '../../../createInstance';
import { updateUser } from '../../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    if (!user) {
        navigate("/login");
    }
    const axiosJWT = createAxios(user, dispatch);
    const [user_name, setUserName] = useState(user?.user?.user_name);
    const [phone_number, setPhoneNumber] = useState(user?.user?.phone_number);
    const [gender, setGender] = useState(user?.user?.gender);
    const [address, setAddress] = useState(user?.user?.address);
    const [edit, setEdit] = useState("");
    const [user_avatar, setUserAvatar] = useState(user?.user?.user_avatar);
    console.log("user_avatar: ", user_avatar === null);
    const formatDate = (date) => {
        const arr = (String(date)).split("/");
        let newDate = arr[2] + "-" + arr[1] + "-" + arr[0];
        return newDate;
    }
    const [birthday, setBirthday] = useState(formatDate(user?.user?.birthday));
    const handleUpAvatar = async (e) => {
        const avatar = e.target.files;
        const fileAvatar = new FormData();
        fileAvatar.append("images", avatar[0]);
        const resAvatar = await axiosJWT.post("/api/products/upload-multiple", fileAvatar);
        setUserAvatar(resAvatar.data[0]);
    }
    const handleSaveInformation = async () => {
        const newUser = {
            user_id: user.user.user_id,
            email: user.user.email,
            user_name,
            phone_number,
            gender,
            address,
            user_avatar,
            birthday
        }
        console.log("newUser: ", newUser);
        await updateUser(newUser, dispatch, user.token, axiosJWT);
        toast.success("Lưu thông tin thành công!");
    }
    //console.log("new date: ", moment(new Date()).locale('L'));
    return (
        <div className="container">
            <div className="content-page ">
                <h1 className='order_heading'>Thông tin tài khoản</h1>
                <div className="profile_wrapper">

                    <div className="left">
                        {user_avatar !== null ?
                            <span>
                                <input id="avatar-image" type="file" hidden onChange={(e) => handleUpAvatar(e)} />
                                <label htmlFor="avatar-image" className='avatar' style={{ backgroundImage: `url("/images/${user_avatar}")` }}></label>
                            </span>
                            :
                            <span>
                                <input id="avatar-image" type="file" hidden onChange={(e) => handleUpAvatar(e)} />
                                <label htmlFor="avatar-image" className='avatar' style={{ backgroundImage: 'url("https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png")' }}></label>
                            </span>
                        }
                        {
                            edit === "user_name" ?
                                <span>
                                    <input type="text" className="edit-profile" value={user_name} onChange={(e) => setUserName(e.target.value)} />
                                    <i className="fas profile-icon fa-check" onClick={() => setEdit("")}></i>
                                </span>
                                :
                                <h4>{user_name} &nbsp;<i className='fas profile-icon fa-edit' onClick={() => setEdit("user_name")}></i></h4>

                        }
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Thông tin tài khoản</h3>
                            <div className="info_data">
                                <div className="data">
                                    <h4>Email</h4>
                                    <p>{user?.user?.email}</p>
                                </div>
                                <div className="data">
                                    <h4>Số điện thoại</h4>
                                    {
                                        edit === "phone_number" ?
                                            <span>
                                                <input type="text" className="edit-profile" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                <i className="fas profile-icon fa-check" onClick={() => setEdit("")}></i>
                                            </span>
                                            :
                                            <p>{phone_number} &nbsp;<i className='fas profile-icon fa-edit' onClick={() => setEdit("phone_number")}></i></p>

                                    }
                                </div>
                            </div>
                        </div>

                        <div className="projects">
                            <h3>Hồ sơ</h3>
                            <div className="projects_data">
                                <div className="data">
                                    <h4>Giới tính</h4>
                                    {
                                        edit === "gender" ?
                                            <span>
                                                <select name="" className="edit-profile" id="" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="Nam">Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                </select>
                                                <i className="fas profile-icon fa-check" onClick={() => setEdit("")}></i>
                                            </span>
                                            :
                                            <p>{gender} &nbsp;<i className='fas profile-icon fa-edit' onClick={() => setEdit("gender")}></i></p>
                                    }
                                </div>
                                <div className="data">
                                    <h4>Ngày sinh</h4>
                                    {
                                        edit === "birthday" ?
                                            <span>
                                                <input type="date" className="edit-profile" onChange={(e) => setBirthday(e.target.value)} />
                                                <i className="fas profile-icon fa-check" onClick={() => setEdit("")}></i>
                                            </span>
                                            :
                                            <p>{moment(birthday).format("DD/MM/YYYY")} &nbsp;<i className='fas profile-icon fa-edit' onClick={() => setEdit("birthday")}></i></p>
                                    }

                                </div>
                            </div>
                            <div className="data" id="add">
                                <h4>Địa chỉ</h4>
                                {
                                    edit === "address" ?
                                        <span>
                                            <input type="text" value={address} className="edit-profile-large" onChange={(e) => setAddress(e.target.value)} />
                                            <i className="fas profile-icon fa-check" onClick={() => setEdit("")}></i>
                                        </span>
                                        :
                                        <p>{address} &nbsp;<i className='fas profile-icon fa-edit' onClick={() => setEdit("address")}></i></p>
                                }
                            </div>
                        </div>
                        <button className="save_profile" onClick={() => handleSaveInformation()}>lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;