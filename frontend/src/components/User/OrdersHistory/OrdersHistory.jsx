
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from './Card/Card';
import { createAxios } from '../../../createInstance';
import { getOrdersHistory } from '../../../redux/apiRequest';
import './OrdersHistory.scss';
const OrdersHistory = () => {
    const OrdersHistory = useSelector((state) => state.user.ordersHistory.allOrdersHistory);
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    if (!user) {
        navigate("/login");
    }
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    useEffect(() => {
        const callAPI = async () => {
            await getOrdersHistory(dispatch, user.token, axiosJWT);
        }
        callAPI();

    }, []
    )
    //console.log("OrdersHistory: ", OrdersHistory);
    return (
        <div className="container">
            <div className="content-page height">
                <h1 className='order_heading'>Đơn hàng của tôi</h1>
                {
                    OrdersHistory && OrdersHistory?.map((order, index) => {
                        return (
                            <Card key={index} order={order} />
                        )
                    })
                }
                {
                    (!OrdersHistory || OrdersHistory?.length === 0) &&
                    <div className="empty-orders"><img src="https://cdn.dribbble.com/users/429792/screenshots/3649946/no_order.png" /></div>

                }
            </div>

        </div>

    );
}

export default OrdersHistory;