import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsFromAPI, getCart } from "../../../redux/apiRequest";
import "./UserHome.scss";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const UserHome = () => {
    const products = useSelector((state) => state.product.products.allProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        async function callAPI() {
            await getAllProductsFromAPI(dispatch);
            //await getCart(dispatch, user.token, axiosJWT);
        }
        callAPI();
    }, []);
    const settings = {
        className: 'section-outstanding__slider',
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        rows: 2,
        speed: 800,
        autoplaySpeed: 3000,
        centerPadding: "0px",
        pauseOnHover: false,
    };
    const settings_brand = {
        className: 'section-outstanding__slider',
        slidesToShow: 2,
        infinite: true,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        rows: 2,
        speed: 800,
        autoplaySpeed: 3000,
        centerPadding: "0px",
        dots: true,
        pauseOnHover: false,

    }
    return (
        <>

            <div className="slider"></div>
            <div className="test_t">

                <div className="Moment">
                    <div className="product-title-container">
                        <Link to="/" className="col-xl-12 product-title">Sản phẩm mới</Link>
                        <p className="col-xl-12 product-title-description">
                            Sản phẩm mới nhất của CSDL
                        </p>
                    </div>
                    <Slider {...settings}>
                        {
                            products && products.map((product, index) => {
                                return product.new_product && (
                                    <Link to={`/product-details/${product.product_id}`} className="col-xl-3 item testt">
                                        <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                        <div className="product-infor">
                                            <div className="product-name">
                                                {product.product_name}
                                            </div>
                                            <span className="Pro-price" style={{ color: "red", marginRight: "10px", fontWeight: 600 }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                            {product.discount ? <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del> : <></>}
                                        </div>
                                    </Link>
                                )
                            }
                            )
                        }
                    </Slider>
                </div>
                <div className="Moment_v2">
                    <div className="product-title-container">
                        <Link to="/" className="col-xl-12 product-title">Sản phẩm mới</Link>
                        <p className="col-xl-12 product-title-description">
                            Sản phẩm mới nhất của CSDL
                        </p>
                    </div>
                    <Slider {...settings_brand}>
                        {
                            products && products.map((product, index) => {
                                return product.new_product && (
                                    <Link to={`/product-details/${product.product_id}`} className="col-xl-3 item testt">
                                        <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                        <div className="product-infor">
                                            <div className="product-name">
                                                {product.product_name}
                                            </div>
                                            <span className="Pro-price" style={{ color: "red", marginRight: "10px", fontWeight: 600 }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                            {product.discount ? <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del> : <></>}
                                        </div>
                                    </Link>
                                )
                            }
                            )
                        }
                    </Slider>
                </div>
                <div className="Sale">
                    <div className="product-title-container">
                        <Link to="/products/sale" className="col-xl-12 product-title">Đang giảm giá</Link>
                        <p className="col-xl-12 product-title-description">
                            Sản phẩm chỉ còn một vài Size và không được sản xuất lại sau khi bán hết
                        </p>
                    </div>
                    <Slider {...settings}>
                        {
                            products && products.map((product, index) => {
                                return product.discount && (<Link to={`/product-details/${product.product_id}`} className="col-xl-3 item testt">
                                    <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                    <div className="product-infor">
                                        <div className="product-name">
                                            {product.product_name}
                                        </div>
                                        <span className="Pro-price" style={{ color: "red", marginRight: "10px", fontWeight: 600 }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                        {product.discount ? <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del> : <></>}
                                    </div>
                                </Link>)
                            })
                        }
                    </Slider>
                </div>

                <div className="Sale_v2">
                    <div className="product-title-container">
                        <Link to="/products/sale" className="col-xl-12 product-title">Đang giảm giá</Link>
                        <p className="col-xl-12 product-title-description">
                            Sản phẩm chỉ còn một vài Size và không được sản xuất lại sau khi bán hết
                        </p>
                    </div>
                    <Slider {...settings_brand}>
                        {
                            products && products.map((product, index) => {
                                return product.discount && (<Link to={`/product-details/${product.product_id}`} className="col-xl-3 item testt">
                                    <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                    <div className="product-infor">
                                        <div className="product-name">
                                            {product.product_name}
                                        </div>
                                        <span className="Pro-price" style={{ color: "red", marginRight: "10px", fontWeight: 600 }}>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                        {product.discount ? <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del> : <></>}
                                    </div>
                                </Link>)
                            })
                        }
                    </Slider>
                </div>
            </div>

        </>
    );
}

export default UserHome;