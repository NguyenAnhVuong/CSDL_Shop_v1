import { Link } from 'react-router-dom';

import './UserFooter.scss';

const UserFooter = () => {
    return (<footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-xl-4">
                    <div className="footer__title">
                        Giới thiệu
                    </div>
                    <div className="footer__description">
                        CSDL được thành lập vào năm 2021, tất cả sản phẩm của CSDL đều được tham khảo và trưng bày dựa theo tiêu chí học là chính
                    </div>
                    <div className="big-logo"></div>
                </div>
                <div className="col-xl-2">
                    <div className="footer__title">
                        Liên kết
                    </div>
                    <div className="footer__description">
                        <Link to="/" className="footer__description">Trang chủ</Link>
                        <p></p>
                        <Link to="/products/all" className="footer__description">Sản Phẩm</Link>
                        <p></p>
                        <Link to="/products/sale" className="footer__description">Đang Giảm Giá</Link>
                        <p></p>
                        <Link to="/tutorial" className="footer__description">Hướng Dẫn</Link>
                        <p></p>
                        <Link to="/size" className="footer__description">Bảng Size</Link>
                        <p></p>
                        <Link to="/introduce" className="footer__description">Giới Thiệu CSDL</Link>
                        <p></p>
                    </div>
                </div><div className="col-xl-3">
                    <div className="footer__title">
                        Thông tin liên hệ
                    </div>
                    <div className="footer__description">
                        <i className="fas fa-map-marker-alt"></i>
                        <span> 🔥Số 1 Đại Cồ Việt, phường Bách Khoa, quận Hai Bà Trưng, thành phố Hà Nội, Thủ đô Hà Nội, Việt Nam</span>
                        <p></p>
                        <i className="fas fa-phone-alt"></i>
                        <span> 0333 944 588</span>
                        <p></p>
                        <i className="fas fa-envelope"></i>
                        <span> navuong2001@gmail.com</span>
                    </div>
                </div><div className="col-xl-3">
                    <div className="footer__title">
                        Fanpage
                    </div>
                    <div className="footer__description">
                        <a href="https://www.facebook.com/ictsv.hust" target="blank" className="fanpage">
                            <div className="avatar" ></div>
                            <div className="fanpage-name">ICTSV</div>
                            <div className="liked" ></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>);
}

export default UserFooter;