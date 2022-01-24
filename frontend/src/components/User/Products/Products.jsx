import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsFromAPI } from "../../../redux/apiRequest";
import "./Products.scss";
const Products = (props) => {
    const products = useSelector((state) => state.product.products.allProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        async function callAPI() {
            await getAllProductsFromAPI(dispatch);
        }
        callAPI();
    }, []);
    console.log(props.type);
    return (
        <>
            <div className="slider-products"></div>
            <div className="new-product">
                <div className="container">
                    <div className="row">
                        <div className="product-title-container products">
                            <p className="col-xl-12 product-title products">
                                {props.title}
                            </p>
                        </div>
                        {
                            products && products.map((product, index) => {
                                return (
                                    props.type === "all" ? <Link to={`/product-details/${product.product_id}`} className="col-xl-3 item">
                                        <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                        <div className="product-infor">
                                            <div className="product-name">
                                                {product.product_name}
                                            </div>
                                            <span className="product-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                            <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del>
                                        </div>
                                    </Link>
                                        :
                                        props.type === "sale" ?
                                            product.discount !== 0 && <Link to={`/product-details/${product.product_id}`} className="col-xl-3 item">
                                                <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                                <div className="product-infor">
                                                    <div className="product-name">
                                                        {product.product_name}
                                                    </div>
                                                    <span className="product-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                                    <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del>
                                                </div>
                                            </Link>
                                            :
                                            props.type === product.product_type && <Link to={`/product-details/${product.product_id}`} className="col-xl-3 item">
                                                <div className="product-img" style={{ backgroundImage: `url('/images/${product.product_avatar}')` }}></div>
                                                <div className="product-infor">
                                                    <div className="product-name">
                                                        {product.product_name}
                                                    </div>
                                                    <span className="product-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                                                    <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del>
                                                    {/* <span className="product-price">
                                                        {product.price}
                                                    </span>
                                                    <span className="product-price-dong">
                                                        ₫
                                                    </span> */}
                                                </div>
                                            </Link>

                                )
                            }
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;