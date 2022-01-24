import { Link } from "react-router-dom";

const Item = (props) => {
    const sizeText = ["S", "M", "L", "XL"];
    return (
        <li className="col-md-4">
            <figure className="itemside mb-3">
                <Link to={`/product-details/${props.product.product_id}`} className="aside"><img src={`/images/${props.product.product_avatar}`} className="img-sm border" alt="" /></Link>

                <figcaption className="info align-self-center">
                    <Link to={`/product-details/${props.product.product_id}`} className="item-title">{props.product.product_name}</Link> <span className="text-muted">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price * (1 - props.product.discount / 100))}</span>
                    <span className="p-value">{sizeText[props.product.size]}</span>
                    <span className="p-value">{props.product.quantity}</span>
                </figcaption>
            </figure>
        </li>
    );
}

export default Item;