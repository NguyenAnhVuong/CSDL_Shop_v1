import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAxios } from '../../../createInstance';
import { createOrder, getCart } from '../../../redux/apiRequest';
import './Checkout.scss';
const Checkout = (props) => {
    const cart = useSelector((state) => state.auth.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userFromRedux = useSelector((state) => state.auth.login.currentUser);
    const user = userFromRedux.user;
    const axiosJWT = createAxios(userFromRedux, dispatch);

    const sizeText = ["S", "M", "L", "XL"];
    const [user_name, setUserName] = useState(user.user_name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [phone_number, setPhoneNumber] = useState(user.phone_number);

    const [user_nameError, setUser_nameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phone_numberError, setPhone_numberError] = useState('');


    const handleUserName = (e) => {
        const user_name = e.target.value;
        if (user_name === '') {
            setUser_nameError('Không thể bỏ trống tên người nhận !');
            setUserName(e.target.value);
        } else {
            if (user_name.length < 6) {
                setUser_nameError("Tên người nhận cần lớn hơn 6 ký tự !");
                setUserName(e.target.value);
            } else {
                setUserName(e.target.value);
                setUser_nameError('');
            }
        }

    }

    const handleEmail = (e) => {
        const checkEmail = e.target.value;

        if (checkEmail === '') {

            setEmailError("Không thể bỏ trống email!");
            setEmail(e.target.value);
        } else {

            if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(checkEmail)) {
                setEmailError("Email sai định dạng !");
                setEmail(e.target.value);
            } else {
                setEmail(e.target.value);
                setEmailError('');
            }
        }

    }

    const handlePhoneNumber = (e) => {
        const phone_number = e.target.value;
        if (phone_number === '') {
            setPhone_numberError('Không thể bỏ trống số điện thoại người nhận!');
            setPhoneNumber(e.target.value);
        } else {
            if (!/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phone_number)) {
                setPhone_numberError('Số điện thoại sai định dạng ');
                setPhoneNumber(e.target.value);
            } else {
                setPhoneNumber(e.target.value);
                setPhone_numberError('');
            }
        }
    }

    const handleAddress = (e) => {
        const address = e.target.value;
        if (address === '') {
            setAddressError('Không thể bỏ trống địa chỉ người nhận !');
            setAddress(e.target.value);
        } else {

            setAddress(e.target.value);
            setAddressError('');
        }
    }

    const handleOderComplete = async (e) => {
        e.preventDefault();
        const newOrder = {
            user_name,
            email,
            address,
            phone_number,
            note: props.note
        }
        //console.log("newOrder: ", newOrder);
        // const res = await axiosJWT.post("/api/orders/create", newOrder, {
        //     headers: { authorization: userFromRedux.token }
        // });
        if (user_name === '' || email === '' || address === '' || phone_number === '') {
            if (user_name === '') {
                setUser_nameError('Không thể bỏ trống tên người nhận !');
            }
            if (email === '') {
                setEmailError('Không thể bỏ trống email !');
            }
            if (address === '') {
                setAddressError('Không thể bỏ trống địa chỉ người nhận !');
            }
            if (phone_number === '') {
                setPhone_numberError('Không thể bỏ trống số điện thoại người nhận !');
            }
        } else {
            const res = await createOrder(newOrder, dispatch, userFromRedux.token, axiosJWT);
            await getCart(dispatch, userFromRedux.token, axiosJWT);
            props.setRefreshHeader(!props.refreshHeader);
            setUser_nameError('');
            setEmailError('');
            setAddressError('');
            setPhone_numberError('');
            toast.success('Đặt hàng thành công!');
            navigate("/");

        }
    }
    let total = 0;
    return (
        <div className="container">
            <div className="content-page ">
                <div className='checkout_wrap'>
                    <div className='checkout_main'>
                        <h1 >Thanh toán</h1>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/cart" id="blue_link">Giỏ hàng</Link>
                            </li>
                            <li className="breadcrumb-item breadcrumb-item-current">Thông tin giao hàng</li>
                        </ul>
                        <h2 className="section_header">Thông tin giao hàng</h2>
                        <p className="have_account">
                            {/* Bạn đã có tài khoản?
                            <a href="/login" id="blue_link">&nbsp;Đăng nhập</a> */}
                        </p>

                        <div className="field-input-wrapper">
                            <input placeholder="Họ và tên" className="field-input" size="30" type="text" value={user_name} onChange={(e) => handleUserName(e)} />
                            <div className="order-error">{user_nameError}</div>
                        </div>
                        <div className="field-input-wrapper">
                            <div className="field-two-thirds">

                                <input placeholder="Email" className="field-input" size="30" type="email" value={email} onChange={(e) => handleEmail(e)} />
                                <div className="order-error">{emailError}</div>

                            </div>
                            <div className="field-third">
                                <input placeholder="Số điện thoại" className="field-input" size="30" value={phone_number} onChange={(e) => handlePhoneNumber(e)} />
                                <div className="order-error">{phone_numberError}</div>
                            </div>
                        </div>
                        <div className="field-input-wrapper">
                            <input placeholder="Địa chỉ" name="address" className="field-input" size="30" type="text" value={address} onChange={(e) => handleAddress(e)} />
                            <div className="order-error">{addressError}</div>
                        </div>
                        <h2 className="section_header_2">Phương thức vận chuyển</h2>
                        <div className="radio-wrapper">
                            <label className="radio-label">
                                <div className="radio-input">
                                    <input id="shipping_rate" className="input-radio" type="radio" defaultChecked />
                                </div>
                                <span className="radio-label-primary">Giao hàng tận nơi</span>
                                <span className="content-box-emphasis">25,000₫</span>
                            </label>
                        </div>
                        <h2 className="section_header_3">Phương thức thanh toán</h2>

                        <div className="radio-wrapper COD">
                            <label className="radio-label">
                                <div className="radio-input">
                                    <input id="shipping_rate" className="input-radio" type="radio" defaultChecked />
                                </div>
                                <div className="radio-content-input">
                                    <img className="shipping-img" src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1" />
                                    <div>
                                        <span className="radio-label-primary" id="pay">Thanh toán khi giao hàng (COD)</span>


                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="radio-wrapper content-box-row content-box-row-secondary " >
                            <div className="blank-slate">
                                Khi Shipper đến nhận hàng , vui lòng trả tiền trực tiếp cho Shipper !
                            </div>
                        </div>
                        <div className="step-footer">
                            <Link className="step-footer-previous-link" id="blue_link" to="/cart">
                                Giỏ hàng
                            </Link>

                            <form id="form_next_step" acceptCharset="UTF-8">
                                <input name="utf8" type="hidden" value="✓" />
                                <button type="submit" className="step-footer-continue-btn btn" onClick={(e) => handleOderComplete(e)}>
                                    <span className="btn-content" >Hoàn tất đơn hàng</span>
                                </button>
                            </form>

                        </div>
                    </div>
                    <div className='checkout_sidebar'>
                        <div className="order-summary-section order-summary-section-product-list" data-order-summary-section="line-items">
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => {
                                            total += (item.price - item.price * item.discount / 100) * item.quantity;
                                            return (
                                                <tr key={index} className="product">
                                                    <td className="product-image">
                                                        <div className="product-thumbnail">
                                                            <div className="product-thumbnail-wrapper">
                                                                <img className="product-thumbnail-image" alt="" src={`/images/${item.product_avatar}`} />
                                                            </div>
                                                            <span className="product-thumbnail-quantity">{item.quantity}</span>
                                                        </div>
                                                    </td>
                                                    <td className="product-description">
                                                        <span className="product-description-name order-summary-emphasis">{item.product_name}</span>

                                                        <span className="product-description-variant order-summary-small-text">
                                                            <p>{sizeText[item.size]}</p>
                                                        </span>

                                                    </td>
                                                    <td className="product-price">
                                                        <span className="order-summary-emphasis">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.price - item.price * item.discount / 100) * item.quantity)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {/* <tr className="product">
                                        <td className="product-image">
                                            <div className="product-thumbnail">
                                                <div className="product-thumbnail-wrapper">
                                                    <img className="product-thumbnail-image" src="//product.hstatic.net/1000321269/product/ban_sao_cua_q05fakmm-1-7nps-hinh_mat_sau-0_bad40c0674244827a4a85b321724e7af_small.jpg" />
                                                </div>
                                                <span className="product-thumbnail-quantity">1</span>
                                            </div>
                                        </td>
                                        <td className="product-description">
                                            <span className="product-description-name order-summary-emphasis">TSUN Blossom Flower Tee 2022 - Red</span>

                                            <span className="product-description-variant order-summary-small-text">
                                                <p>S</p>
                                            </span>

                                        </td>
                                        <td className="product-price">
                                            <span className="order-summary-emphasis">350,000₫</span>
                                        </td>
                                    </tr>
                                    <tr className="product">
                                        <td className="product-image">
                                            <div className="product-thumbnail">
                                                <div className="product-thumbnail-wrapper">
                                                    <img className="product-thumbnail-image" src="//product.hstatic.net/1000321269/product/ban_sao_cua_q05fakmm-1-vt8i-hinh_mat_truoc-0_2a2632998bbe42e78e5b6c9aecb243d4_medium.jpg " alt="TSUN LNY Firecracker Tee - Black" />
                                                </div>
                                                <span className="product-thumbnail-quantity">1</span>
                                            </div>
                                        </td>
                                        <td className="product-description">
                                            <span className="product-description-name order-summary-emphasis">TSUN LNY Firecracker Tee - Black</span>

                                            <span className="product-description-variant order-summary-small-text">
                                                <p>S</p>
                                            </span>

                                        </td>
                                        <td className="product-price">
                                            <span className="order-summary-emphasis">320,000₫</span>
                                        </td>
                                    </tr> */}

                                </tbody>
                            </table>
                        </div>
                        <div className="order-summary-section-discount">


                            <div className="fieldset">
                                <div className="field  ">
                                    <div className="field-input-btn-wrapper">
                                        <div className="field-input-wrapper">

                                            <input placeholder="Mã giảm giá" className="field-input" size="30" type="text" />
                                        </div>
                                        <button type="submit" className="field-input-btn btn btn-default btn-disabled">
                                            <span className="btn-content" >Sử dụng</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <table className="total-line-table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="total-line total-line-subtotal">
                                    <td className="total-line-name">Tạm tính</td>
                                    <td className="total-line-price">
                                        <span className="order-summary-emphasis" >
                                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="total-line total-line-shipping">
                                    <td className="total-line-name">Phí vận chuyển</td>
                                    <td className="total-line-price">
                                        <span className="order-summary-emphasis" >{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(25000)}</span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot className="total-line-table-footer">
                                <tr className="total-line">
                                    <td className="total-line-name payment-due-label">
                                        <span className="payment-due-label-total">Tổng cộng</span>
                                    </td>
                                    <td className="total-line-name payment-due">
                                        <span className="payment-due-currency">VND</span>
                                        <span className="payment-due-price" >
                                            {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total + 25000)}
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Checkout;