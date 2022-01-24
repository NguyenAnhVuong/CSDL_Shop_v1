import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { getAllUserFromAPI } from "../../../redux/apiRequest";
import { useState } from "react";
import './UsersInformation.scss'

const UsersInformation = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const allUsers = useSelector((state) => state.user.users.allUsers);
    const [status, setStatus] = useState(1);
    let ptrArr = [].concat(allUsers);
    const setPtrArr = (ptr) => {
        ptrArr = [...ptr];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    const changeStatus = (choose) => {
        switch (parseInt(choose)) {
            case 1:
                setPtrArr([...allUsers].sort((a, b) => a.user_id > b.user_id ? 1 : -1));
                console.log(ptrArr);
                break;
            case 2:
                setPtrArr([...allUsers].sort((a, b) => a.userTotal > b.userTotal ? 1 : -1))
                console.log(ptrArr);
                break;
            case 3:
                setPtrArr([...allUsers].sort((a, b) => a.userTotal < b.userTotal ? 1 : -1))
                console.log(ptrArr);
                break;
            case 4:
                setPtrArr([...allUsers].filter((a) => {
                    let ptr_string = a.birthday.substring(3, 5);
                    let curr = new Date()
                    console.log(parseInt(ptr_string))
                    if (parseInt(ptr_string) == curr.getMonth() + 1) return a;
                }))
                console.log(ptrArr);
                break;
            default:
                break;
        }
    }
    allUsers && changeStatus(status);
    useEffect(() => {
        const callAPI = async () => {
            if (!user || user.user.user_id !== 1) {
                navigate("/login");
            } else {
                await getAllUserFromAPI(dispatch, user.token, axiosJWT);
            }
        }
        callAPI();
        console.log("allUsers", allUsers);
    }, []);
    return (
        <div className="container">
            <div className="content-page noi">
                <h1 className="userInfo_heading">Danh sách người dùng</h1>
                <div className="table-responsive users-table-responsive">
                    <div className="order-sort">
                        <select className="sortBar" onChange={e => setStatus(e.target.value)}>
                            <option value="1">Sắp xếp theo ID tăng dần</option>
                            <option value="2">Sắp xếp chi tiêu tăng dần</option>
                            <option value="3">Sắp xếp chi tiêu giảm dần</option>
                            <option value="4">Người sinh nhật trong tháng này</option>
                        </select>
                    </div>
                    <table className="table users-table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Email</th>
                                <th scope="col">Chi tiêu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ptrArr && ptrArr.map((user, index) => {
                                    return (
                                        <tr>
                                            <td>{user?.user_id}</td>
                                            <td>
                                                {user?.user_name}
                                            </td>
                                            <td>{user?.gender}</td>
                                            <td>{user?.birthday}</td>
                                            <td>{user?.address ? user.address : ""}</td>
                                            <td>{user?.email}</td>
                                            <td>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user?.userTotal)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersInformation;