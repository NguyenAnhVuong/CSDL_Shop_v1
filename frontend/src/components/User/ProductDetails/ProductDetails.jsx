import { useEffect, useState } from 'react';
import './ProductDetails.scss'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { addToCart, getCart } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProductDetails = (props) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(user, dispatch);
    const products = useSelector((state) => state.product.products.allProducts);
    const [check, setCheck] = useState(true);
    const [product, setProduct] = useState({});
    const [image_array, setImageArray] = useState([]);
    const [num, setNum] = useState(1);
    const [size, setSize] = useState(0);
    const test1 = () => {
        setCheck(true);
    }
    const test2 = () => {
        setCheck(false);
    }
    const changeText = (event) => {
        var ptr = event.target.value;
        ptr = parseInt(ptr)
        if (Number.isInteger(ptr)) setNum(ptr);
    }

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const changeOn = (index, bulin) => {
        setPhotoIndex(index)
        setIsOpen(bulin)
    }

    const properties = {
        dots: false,
        autoplay: false,
        indicators: true,
        transitionDuration: 500
    }
    const slideRef = useRef();
    const [pos, setPos] = useState("");
    const goto = (x, n) => {
        setPos(n);
        // var ptr = document.getElementById(pos);
        // ptr.style.border = "1px solid red";
        slideRef.current.goTo(x);
    }
    //changeCss

    const handleAddToCard = async () => {
        if (!user) {
            navigate("/login");
        } else {
            const add = {
                product_id: product.product_id,
                quantity: num,
                size
            }
            await addToCart(add, dispatch, user.token, axiosJWT);
            await getCart(dispatch, user.token, axiosJWT);
            props.setRefreshHeader(!props.refreshHeader);
            toast.success('Thêm sản phẩm vào giỏ thành công!');

            //console.log("add: ", add);
        }

    }

    useEffect(() => {
        const arr = window.location.pathname.split("/");
        const id = Number(arr[arr.length - 1]);
        //console.log("id: ", id);
        //console.log("products: ", products);
        const tmp = products.find((product) => {
            return product.product_id === id;
        });
        //console.log("product: ", tmp);

        if (tmp) {
            setProduct(tmp);
            setImageArray([tmp.product_avatar, ...tmp.image_array]);
            //setImageArray(tmp.image_array);

        }
    }, [])

    return (

        <div className="container details">
            <div className="img-show">
                <div className="img-show-details">
                    <div className="list-img">

                        <ul className="slider-thumb">
                            {
                                image_array?.map((image, index) => {
                                    return (
                                        <li className="product-img" key={index}>
                                            <div className="img-" id="choice1" onClick={() => goto(index, "choice1")}  ><img alt=" Signature Tee - White 1 " src={`/images/${image}`}  ></img></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                    <div className="Product-details-img">

                        <Slide ref={slideRef} {...properties} >
                            {/* <div onClick={() => changeOn(0, true)}><img className="product-image-feature" src={`/images/${product.product_avatar}`} alt=" Signature Tee - White 1 "></img></div> */}
                            {
                                image_array?.map((image, index) => {
                                    return <div key={index} onClick={() => changeOn(index, true)}><img className="product-image-feature" src={`/images/${image}`} alt=" Signature Tee - White 1 "></img></div>
                                })
                            }
                        </Slide>

                        {isOpen &&
                            <Lightbox
                                mainSrc={`/images/${image_array[photoIndex]}`}
                                nextSrc={`/images/${image_array[(photoIndex + 1) % image_array.length]}`}
                                prevSrc={`/images/${image_array[(photoIndex + image_array.length - 1) % image_array.length]}`}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() => setPhotoIndex((photoIndex + image_array.length - 1) % image_array.length)}
                                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % image_array.length)}
                            />

                        }


                    </div>
                </div>
            </div>
            <div className="ProductDetail-content">
                <div className="Producdetail">
                    <span className="ProductName">{product.product_name}</span>
                    <br></br>
                    <br />
                    {/* <span className="IDproduct">Mã sản phẩm</span> */}
                </div>

                <div className="Product-price">
                    {product.discount ? <span className="Pro-sale">{product.discount}%</span> : <></>}
                    <span className="Pro-price">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price * product.discount / 100)}</span>
                    {product.discount ? <del className="Pro-real">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(product.price))}</del> : <></>}
                </div>
                {/* {product.price - product.price * product.discount / 100} */}
                <div className="Check-box-size">
                    <span className="Size">SIZE:</span><br></br>

                    <div className="check-box">
                        <div className="abox">
                            <input type="radio" defaultChecked className="button-check" id="S" name="address" value="0" onClick={() => setSize(0)}></input>
                            <label htmlFor='S' className="charset">S</label >
                        </div>
                        <div className="abox">
                            <input type="radio" className="button-check" id="M" name="address" value="1" onClick={() => setSize(1)}></input>
                            <label htmlFor='M' className="charset">M</label >
                        </div>
                        <div className="abox">
                            <input type="radio" className="button-check" id="L" name="address" value="2" onClick={() => setSize(2)}></input>
                            <label htmlFor='L' className="charset">L</label >
                        </div>
                        <div className="abox">
                            <input type="radio" className="button-check" id="XL" name="address" value="3" onClick={() => setSize(3)}></input>
                            <label htmlFor='XL' className="charset">XL</label >
                        </div>
                    </div>
                </div>

                <div className="bar_selector">

                    <div className="quantity_button">
                        <input className="quantity_change l" type="button" value="-" onClick={() => { if (num > 1) setNum(num - 1) }} ></input>
                        <input className="text_change" type="text" value={num} onChange={(event) => changeText(event)} ></input>
                        <input className="quantity_change r" type="button" value="+" onClick={() => setNum(num + 1)} ></input>
                    </div>

                    <div className="add-to-cart">
                        <button className="button-add" onClick={() => handleAddToCard()}>Thêm vào giỏ</button>
                    </div>
                </div>

                <div className="Full-Infor">
                    <section className="Pro-details">
                        <ul className="task-bar">

                            <li className="li_cs">
                                <div className="con" onClick={() => test1()}>Chính sách đổi trả hàng </div>
                            </li>

                            <li className="li_cs">
                                <div className="con" onClick={() => test2()}> Hướng dẫn mua hàng</div>
                            </li>
                        </ul>
                        <div className="tab-content">
                            {
                                check ?
                                    <div className="test" id="">
                                        <div className="title2">
                                            <p><b>1. Điều kiện đổi trả</b></p><br></br>
                                        </div>
                                        <div className="detailsnote">
                                            <p></p><p className="noname1">Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng trong 3 ngày tính tại thời điểm nhận hàng&nbsp;trong những trường hợp sau:</p><ul><li>Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.<br></br></li></ul><p><br></br></p><ul><li>Không đủ số lượng, không đủ bộ như trong đơn hàng. ( Khi nhận hàng các bạn sẽ&nbsp;được kiểm tra trước khi nhận, các bạn có quyền không nhận hàng khi không&nbsp;đủ số lượng hoặc sai mẫu. Các trường hợp&nbsp;đã nhận hàng xong Shop sẽ không giải quyết)</li></ul><br></br><p className='noname1'>Nếu trong trường hợp các bạn&nbsp;đã nhận hàng nhưng&nbsp;đặt nhầm Size:<br></br></p><p>+ Các bạn có thể nhắn tin cho CSDL&nbsp;để&nbsp;đổi hàng&nbsp;đúng Size cho các bạn, CSDL có dịch vụ&nbsp;đổi trả hàng tận nhà cho các bạn ( Phí Ship các bạn tự thanh toán nhé!)</p><p ><strong><br /><p className="title2">- Sản phẩm được đổi là khi :</p></strong></p><div className='noname2'><p>+ Trong 3 ngày tính từ ngày nhận hàng.</p><p>+ Chưa qua sử dụng ( mặc , giặt )<br></br></p><p>+ Mạc , tag&nbsp;áo còn&nbsp;đầy&nbsp;đủ.</p><p>+ Còn&nbsp;đầy&nbsp;đủ hóa&nbsp;đơn mua hàng.</p><p><strong></strong><br></br></p></div>
                                        </div>

                                    </div>
                                    :
                                    <div className="test" id="">
                                        <div className="title1">
                                        </div>
                                        <div className="detailsnote">
                                            <p><span className="wysiwyg-font-size-medium"><strong></strong></span><span className="wysiwyg-font-size-medium"></span></p><p><span className="wysiwyg-font-size-medium"><strong><p className="title2">1. Hướng dẫn sử dụng website CSDL:</p><br></br></strong></span></p><p><span className="wysiwyg-font-size-medium"></span><span className="wysiwyg-font-size-medium"></span><span className="wysiwyg-font-size-medium"><strong></strong></span><span className="wysiwyg-font-size-medium"></span><span className="wysiwyg-font-size-medium"><strong></strong></span><span className="wysiwyg-font-size-medium"></span><span className="wysiwyg-font-size-medium"><strong></strong></span><span className="wysiwyg-font-size-medium"></span></p><p><span className="wysiwyg-font-size-medium"></span><span className="wysiwyg-font-size-medium"></span>- Các bước mua hàng tại&nbsp;Web CSDL:</p><br /><p>+ Chọn sản phẩm -&gt; chọn Size sản phẩm -&gt; thêm vào giỏ hàng -&gt; thanh toán</p><p>(Trong trường hợp các bạn mua nhiều sản phẩm, các bạn thêm từng sản phẩm vào giỏ hàng, sau khi&nbsp;đã&nbsp;đủ sản phẩm và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng và&nbsp;ấn THANH TOÁN)</p><br></br><p>+ Thanh toán -&gt;&nbsp;Điền&nbsp;đầy&nbsp;đủ thông tin -&gt; Tên -&gt; Số&nbsp;Điện Thoại -&gt;&nbsp;Địa chỉ nhận hàng - &gt; Mail.</p><p>(&nbsp;Đơn hàng thành công là khi các bạn&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và chính xác, các bạn cần&nbsp;điền&nbsp;đầy&nbsp;đủ thông tin và Mail&nbsp;để CSDL có thể xác nhận&nbsp;đơn hàng qua Mail cho các bạn.)</p><p><span className="wysiwyg-font-size-medium"><strong><br></br><p className="title2">2. Hình thức mua hàng tại CSDL:</p><br></br></strong></span></p><p><span className="wysiwyg-font-size-medium noname1">- Các bạn có thể mua hàng tại&nbsp;Web CSDL bằng các hình thức thanh toán sau&nbsp;đây:</span></p><p><span className="wysiwyg-font-size-medium noname2"><strong><u className="title2">Cách 1</u></strong><strong>:</strong>&nbsp;Thanh toán khi nhận hàng tại nhà&nbsp;(COD – giao hàng và thu tiền tận nơi)</span></p><p><span className="wysiwyg-font-size-medium"><strong><u className="title2">Cách 2</u></strong>: Thanh toán chuyển khoảng trước cho CSDL&nbsp;(Trước khi CHUYỂN KHOẢN các bạn vui lòng nhắn tin trước cho CSDL qua Ins hoặc FB để chúng tôi kiểm tra và xác nhận đơn hàng.)<br></br></span><br></br></p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>

    );
}

export default ProductDetails;