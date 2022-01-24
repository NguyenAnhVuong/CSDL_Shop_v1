import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { getAllOrders } from "../../../redux/apiRequest";
import Order from "./Order/Order";
import './Orders.scss'
const Oders = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const orders = useSelector((state) => state.order.orders.allOders);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const [refresh, setRefresh] = useState(false);
    let arr_show = orders ? [...orders] : [];
    const [status, setStatus] = useState(1);
    const setArr_show = (arr) => {
        arr_show = [...arr];
    }
    // const [arr_show, setArr_show] = useState();
    String.prototype.cutting = () => {

    }
    ////////////////////////////////////////////////////////////////////////
    const chooseOptions = (ptr) => {
        switch (parseInt(ptr)) {
            case 1:
                setArr_show([...orders].filter((a) => { if (a.send == 0 && a.success == 0) return a }))
                break;
            case 2:
                setArr_show([...orders].filter((a) => { if (a.send == 1 && a.success == 0) return a }))
                break;
            case 3:
                setArr_show([...orders].filter((a) => { if (a.success == 1) return a }))
                break;
            case 4:
                setArr_show([...orders].sort((a, b) => parseInt(a.total) > parseInt(b.total) ? 1 : -1))
                break;
            case 5:
                setArr_show([...orders].sort((a, b) => parseInt(a.total) < parseInt(b.total) ? 1 : -1))
                break;
            default:
        }
    }
    orders && chooseOptions(status);
    useEffect(() => {
        const callAPI = async () => {
            if (!user || user.user.user_id !== 1) {
                navigate("/login");
            } else {
                const res = await getAllOrders(dispatch, user.token, axiosJWT);
            }
        }
        callAPI();
    }, [refresh]);
    return (
        <div className="container">
            <div className="content-page">
                <div className="noname">
                    <h1 className='order_heading'>Danh sách đơn hàng</h1>
                    <div className="order-sort">
                        <select className="sortBar" onChange={(e) => setStatus(e.target.value)}>
                            <option value="1">Đơn đã xác nhận</option>
                            <option value="2">Đơn đang giao</option>
                            <option value="3">Đơn hoàn tất</option>
                            <option value="4">Sắp xếp theo giá tăng</option>
                            <option value="5">Sắp xếp theo giá giảm</option>
                        </select>
                    </div>
                    {
                        arr_show?.length !== 0 && arr_show?.map((order, index) => {
                            return <Order key={index} order={order} setRefresh={setRefresh} refresh={refresh} />
                        })

                    }
                    {
                        arr_show?.length === 0 && <div className="empty-orders"><img src="https://cdn.dribbble.com/users/429792/screenshots/3649946/no_order.png" /></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Oders;