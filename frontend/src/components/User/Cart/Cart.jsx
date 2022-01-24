import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cart.scss';
import Item from './Item/Item';
const Cart = (props) => {
    const cart = useSelector((state) => state.auth.cart.cart);
    const [count, setCount] = useState(0);
    const [refresh, setRefresh] = useState(false);
    let total = 0;
    useEffect(() => {
        if (cart) {
            setCount(cart.length);
        }
        props.setRefreshHeader(!props.refreshHeader);
    }, [refresh])
    return (
        <div className="container">
            <div className="content-page ">
                <h1 className='hd'>Giỏ hàng của bạn</h1>
                <p className="count-cart">Có <strong style={{ fontWeight: 900 }}>{count} sản phẩm</strong> trong giỏ hàng</p>
                <div className="col-md-12 col-xs-12 wrapbox-content-cart-new">
                    <div className="cart-container">
                        <div className="cart-col-left">
                            <div className="main-content-cart">
                                <form action="/cart" method="post" id="cartformpage">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <table className="table-cart">
                                                <tbody>
                                                    {count ?
                                                        cart.map((item, index) => {
                                                            total += item.price * (1 - item.discount / 100) * item.quantity;
                                                            return (
                                                                <Item key={index} item={item} refresh={refresh} setRefresh={setRefresh} />
                                                            )
                                                        })
                                                        :

                                                        <tr><td id="empty_cart" > <img src="/images/empty-cart.png" /></td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <div className="checkout-note clearfix">
                                                {count !== 0 && <textarea id="note" name="note" rows="8" cols="50" placeholder="Ghi chú" value={props.note} onChange={(e) => props.setNote(e.target.value)}></textarea>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-right">
                                            <p className="order-infor">
                                                {count !== 0 && <span>Tổng tiền:</span>}
                                                {count !== 0 && <span className="total_price"><b> {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</b></span>}
                                            </p>
                                            <div className="cart-buttons">
                                                <Link className="button dark link-continue" to="/" title="Tiếp tục mua hàng"><i className="fa fa-reply"></i>Tiếp tục mua hàng</Link>
                                                {/* <button type="submit" id="update-cart" className="btn-update button dark" name="update" value="">Cập nhật</button> */}
                                                {count !== 0 && <Link to="/checkout" id="checkout" className="btn-checkout button drakpay" name="checkout">Thanh toán</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cart;