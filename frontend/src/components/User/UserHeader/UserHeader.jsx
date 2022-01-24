import './UserHeader.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { getCart, logoutUser } from '../../../redux/apiRequest';
import { useEffect, useState } from 'react';
const UserHeader = (props) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const cart = useSelector((state) => state.auth.cart.cart);
    const [count, setCount] = useState(cart ? cart.length : 0);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const navigate = useNavigate();
    let name = "";
    if (user) {
        const arr = user?.user?.user_name.split(" ");
        if (arr) name = arr[arr?.length - 1];
    }

    const handleLogout = async () => {
        await logoutUser(dispatch, navigate, user.token, axiosJWT);
    }

    useEffect(() => {
        const callAPI = async () => {
            let cartAPI;
            if (user) {
                cartAPI = await getCart(dispatch, user.token, axiosJWT);
            }
            if (cartAPI) {
                setCount(cartAPI.length);
            } else {
                setCount(0);
            }
        }
        callAPI();
    }, [user, props.refreshHeader]);

    return (
        <header className="header">
            <div className="container header-container">
                <NavLink to="/" className="header__logo">
                </NavLink>
                <div className="header__item-container">
                    <div className="header__item">
                        <NavLink to="/" className="header__item--link header__item--home">Trang chủ</NavLink>
                    </div>
                    <div className="header__item">
                        <NavLink to="/products/all" className="header__item--link header__item--product">
                            Sản phẩm
                            <i className="fas fa-chevron-down header__item--icon-down"></i>
                        </NavLink>
                        <ul className="header__item-list">
                            <li className="header__item-list--item">
                                <NavLink to="/products/tee">Tee</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/products/jacket">Jacket</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/products/accessories">ACCESSORIES</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/products/pants">Pants</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/products/hoodie">Hoodie</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/products/sweater">Sweater</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="header__item">
                        <NavLink to="/products/sale" className="header__item--link header__item--discount">
                            Đang giảm giá
                            {/* <i className="fas fa-chevron-down header__item--icon-down"></i> */}
                        </NavLink>
                        {/* <ul className="header__item-list">
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/10">10%</NavLink>
                        </li>
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/20">20%</NavLink>
                        </li>
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/30">30%</NavLink>
                        </li>
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/50">50%</NavLink>
                        </li>
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/60">60%</NavLink>
                        </li>
                        <li className="header__item-list--item">
                            <NavLink to="/onSale/70">70%</NavLink>
                        </li>
                    </ul> */}
                    </div>
                    <div className="header__item">
                        <NavLink to="/tutorial/buy" className="header__item--link header__item--instruct">
                            Hướng dẫn
                            <i className="fas fa-chevron-down header__item--icon-down"></i>
                        </NavLink>
                        <ul className="header__item-list">
                            <li className="header__item-list--item">
                                <NavLink to="/tutorial/security">Bảo mật</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/tutorial/return">Đổi trả sản phẩm</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/tutorial/contact">Liên hệ</NavLink>
                            </li>
                            <li className="header__item-list--item">
                                <NavLink to="/tutorial/buy">Hướng dẫn mua hàng</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="header__item">
                        <NavLink to="/size" className="header__item--link header__item--size">Bảng size</NavLink>
                    </div>
                    <div className="header__item">
                        <NavLink to="/introduce" className="header__item--link header__item--about">Giới thiệu</NavLink>
                    </div>
                </div>
                <div className="header__lg-cart">
                    {user ?
                        <>
                            <div className="header__item">
                                {
                                    user.user?.user_id === 1 ?
                                        <NavLink to="/admin/products" className="header__item--link header__lg-cart--logout" onClick={() => props.setAdmin(1)}>
                                            <i className="far fa-user"></i>
                                            User
                                        </NavLink>
                                        :
                                        <NavLink to="/user-profile" className="header__item--link header__lg-cart--logout">
                                            {
                                                user?.user?.user_avatar ?
                                                    <i className="avatar-header" style={{ backgroundImage: `url("/images/${user?.user?.user_avatar}")` }}></i>
                                                    :
                                                    <i className="far fa-user"></i>

                                            }
                                            {
                                                name
                                            }
                                        </NavLink>
                                }

                                <ul className="header__item-list">
                                    <li className="header__item-list--item">
                                        <NavLink to={`/user-profile`} >Tài khoản của tôi </NavLink>
                                    </li>
                                    <li className="header__item-list--item">
                                        <NavLink to={`/orders-history`} >Đơn mua </NavLink>
                                    </li>
                                    <li className="header__item-list--item">
                                        <NavLink to={`/change-password`} >Đổi mật khẩu </NavLink>
                                    </li>
                                    <li className="header__item-list--item">
                                        <NavLink to="/logout" onClick={() => handleLogout()}>Đăng xuất</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </>
                        :
                        <NavLink to="/login" className="header__lg-cart--login">
                            <i className="far fa-user"></i>
                            Đăng nhập
                        </NavLink>
                    }

                    <NavLink to="/cart" className="header__lg-cart--cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="cart-quantity">{count}</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default UserHeader;