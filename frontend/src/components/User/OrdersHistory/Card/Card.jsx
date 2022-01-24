import Item from "./Item/Item";

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h6 className="h6-card">ID đơn hàng: {props.order.order_id}</h6>
                <div className="card">
                    <div className="card-body row">
                        <div className="col"><h4 className="h4-title">Thành tiền:</h4> <p className="p-value">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.order.total)}</p> </div>
                        <div className="col"><h4 className="h4-title">Số điện thoại:</h4><p className="p-value"> {props.order.phone_number}</p> </div>
                        <div className="col"><h4 className="h4-title">Địa chỉ:</h4><p className="p-value">{props.order.address}</p> </div>
                        {
                            props.order.send && props.order.success ?
                                <div className="col"><h4 className="h4-title">Trạng thái:</h4><p className="p-value">Thành công</p></div>
                                :
                                props.order.send ?
                                    <div className="col"><h4 className="h4-title">Trạng thái:</h4><p className="p-value">Đang giao</p></div>
                                    :
                                    <div className="col"><h4 className="h4-title">Trạng thái:</h4><p className="p-value">Xác nhận đơn hàng</p></div>
                        }
                    </div>
                </div>
                <div className="track">
                    <div className="step active"> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Xác nhận đơn hàng</span> </div>
                    {/* <div className="step active"> <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text">Lấy hàng</span> </div> */}
                    {props.order.send ?
                        <div className="step active"> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text">Đang giao</span> </div>
                        :
                        <div className="step "> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text">Đang giao</span> </div>

                    }
                    {
                        props.order.success ?
                            <div className="step active"> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Đã Nhận</span> </div>
                            :
                            <div className="step "> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Đã Nhận</span> </div>
                    }
                </div>

                <ul className="row">
                    {
                        props.order.listProducts.map((product, index) => {
                            return <Item key={index} product={product} />
                        })
                    }
                </ul>

            </div>
        </div>
    );
}

export default Card;