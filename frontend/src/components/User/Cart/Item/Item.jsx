import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createAxios } from "../../../../createInstance";
import { decrementItem, deleteItemInCart, getCart, incrementItem } from "../../../../redux/apiRequest";
const Item = (props) => {
    const sizeText = ["S", "M", "L", "XL"];
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    const [count, setCount] = useState(props.item.quantity);
    const handleDecrement = async () => {
        if (props.item.quantity > 1) {
            await decrementItem(props.item, dispatch, user.token, axiosJWT);
            await getCart(dispatch, user.token, axiosJWT);
            setCount((count) => count - 1);
        }
    }
    const handleIncrement = async () => {
        await incrementItem(props.item, dispatch, user.token, axiosJWT);
        await getCart(dispatch, user.token, axiosJWT);
        setCount((count) => count + 1);

    }
    const handleDeleteItem = async () => {
        await deleteItemInCart(props.item, dispatch, user.token, axiosJWT);
        await getCart(dispatch, user.token, axiosJWT);
        props.setRefresh(!props.refresh);
    }
    return (
        <tr className="line-item-container" data-variant-id="1372311322">
            <td className="image">
                <div className="product_image">
                    <Link to={`/product-details/${props.item.product_id}`}>
                        <img src={`/images/${props.item.product_avatar}`} alt={props.item.product_name} />
                    </Link>
                </div>
            </td>
            <td className="item">
                <Link to={`/product-details/${props.item.product_id}`}>
                    <h3>{props.item.product_name}</h3>
                </Link>
                <p>
                    <span>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price - props.item.price * props.item.discount / 100)}</span>
                </p>
                <p className="variant">
                    <span className="variant_title">{sizeText[props.item.size]}</span>
                </p>
                <div className="qty quantity-partent qty-click clearfix">
                    <button type="button" className="qtyminus qty-btn" onClick={() => handleDecrement()}>-</button>
                    <input type="text" size="4" name="updates[]" id="updates_1372311322" value={count} className="tc line-item-qty item-quantity" readOnly />
                    <button type="button" className="qtyplus qty-btn" onClick={() => handleIncrement()}>+</button>
                </div>
                <p className="price">
                    <span className="line-item-total">
                        {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.item.price * (1 - props.item.discount / 100) * props.item.quantity)}
                    </span>
                </p>
            </td>
            <td className="remove">
                <span className="cart" title="Xóa sản phẩm này" onClick={() => handleDeleteItem()}>
                    <i ><i class='far fa-trash-alt'></i></i>
                </span>
            </td>
        </tr>
    );
}

export default Item;