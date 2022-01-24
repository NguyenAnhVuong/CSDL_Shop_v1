import './AdminHeader.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { logoutUser } from '../../../redux/apiRequest';
const AdminHeader = (props) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const navigate = useNavigate();
    let name = "";
    if (user) {
        const arr = user.user.user_name.split(" ");
        name = arr[arr.length - 1];
    }

    const handleLogout = async () => {
        await logoutUser(dispatch, navigate, user.token, axiosJWT);
    }
    return (
        <header className="header">
            <div className="container header-container">
                <NavLink to="/" className="header__logo">
                </NavLink>
                <div className="header__item-container">
                    <div className="header__item header__admin">
                        <NavLink to="/admin/products" className="header__item--link header__item--home">Danh sách</NavLink>
                    </div>
                    <div className="header__item header__admin">
                        <NavLink to="/admin/orders" className="header__item--link header__item--home">Đơn hàng</NavLink>
                    </div>
                    <div className="header__item header__admin">
                        <NavLink to="/admin/users-information" className="header__item--link header__item--home">Khách hàng</NavLink>
                    </div>
                    {/* <div className="header__item">
                        <NavLink to="/admin/test" className="header__item--link header__item--home">Test</NavLink>
                    </div> */}
                    {/* <div className="header__item">
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
                                <NavLink to="/product/sweater">Sweater</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="header__item">
                        <NavLink to="/products/sale" className="header__item--link header__item--discount">
                            Đang giảm giá
                        </NavLink>
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
                    </div> */}
                </div>
                <div className="header__lg-cart">
                    <div className="header__item">
                        <NavLink to="/" className="header__item--link header__lg-cart--logout" onClick={() => props.setAdmin(0)}>
                            <i className="far fa-user"></i>
                            Admin
                        </NavLink>

                        <ul className="header__item-list">
                            <li className="header__item-list--item">
                                <NavLink to="/logout" onClick={() => handleLogout()}>Đăng xuất</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;