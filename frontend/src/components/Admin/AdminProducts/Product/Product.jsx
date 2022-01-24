import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { createAxios } from "../../../../createInstance";
import { createProduct, deleteProduct, updateProduct } from "../../../../redux/apiRequest";
import './Product.scss';

const Product = (props) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch);
    //const [product_id, setProductId] = useState(props.product.product_id);
    const [product_name, setProductName] = useState(props.product.product_name);
    const [product_type, setProductType] = useState(props.product.product_type);
    const [product_avatar, setProductAvatar] = useState(props.product.product_avatar);
    const [new_product, setNewProduct] = useState(props.product.new_product);
    const [size, setSize] = useState(0);
    const sizeText = ["S", "M", "L", "XL"];
    const [quantity, setQuantity] = useState(props.product.quantity);
    const [price, setPrice] = useState(props.product.price);
    const [discount, setDiscount] = useState(props.product.discount);
    const [bought_count, setBoughtCount] = useState(props.product.bought_count);
    const [image_array, setImageArray] = useState(props.add ? [] : props.product.image_array);
    const [edit, setEdit] = useState(false);
    const [test, setTest] = useState(props.product.quantity[0]);
    const [avatarCount, setAvatarCount] = useState("Ảnh");
    const [imagesCount, setImagesCount] = useState(props.add ? "Ảnh" : `${props.product.image_array.length} Ảnh`);
    const [avatarError, setAvatarError] = useState("");
    const [nameProductError, setNameProductError] = useState("");
    const [multipleImageError, setMultipleImageError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleUpAvatar = async (e) => {
        const avatar = e.target.files;
        if (avatar == '') {
            setAvatarError("Không thể trống ảnh đại diện !")
        } else {
            const fileAvatar = new FormData();
            fileAvatar.append("images", avatar[0]);
            const resAvatar = await axiosJWT.post("/api/products/upload-multiple", fileAvatar);
            setProductAvatar(resAvatar.data[0]);
            setAvatarCount("1 Ảnh");
            setAvatarError("")
        }

    }

    const handleUpImages = async (e) => {
        const images = e.target.files;
        const fileImages = new FormData();
        for (let i = 0; i < images.length; i++) {
            fileImages.append("images", images[i]);
        }
        // console.log(resImages.data.length);
        if (images == '') {
            setMultipleImageError("Không bỏ trống ảnh miêu tả !");
        } else {
            if (images.length > 10) {
                setMultipleImageError("Không thể thêm quá 10 ảnh miêu tả !");
            } else {
                setMultipleImageError("");
                const resImages = await axiosJWT.post("/api/products/upload-multiple", fileImages);
                setImageArray(resImages.data);
                setImagesCount(`${resImages.data.length} Ảnh`);
            }

        }
    }
    const handleAddProduct = async () => {
        const newProduct = {
            product_name,
            product_type,
            new_product,
            quantity,
            discount,
            product_avatar,
            image_array,
            price,
            bought_count
        };
        try {
            if (product_avatar == '' || product_name == ''
                || image_array == '' || quantity == '') {
                if (product_avatar == '') {
                    setAvatarError("Không thể trống ảnh đại diện !");
                }
                if (product_name == '') {
                    setNameProductError("Không thể bỏ trống tên sản phẩm !");
                }
                if (image_array == '') {
                    setMultipleImageError("Không thể bỏ trống ảnh miêu tả sản phẩm !");
                }
                if (quantity == '') {
                    setQuantityError("Không thể bỏ trống số lượng sản phẩm !");
                }
            } else {
                await createProduct(newProduct, dispatch, user.token, axiosJWT);
                setAvatarError("");
                setNameProductError("");
                setMultipleImageError("");
                props.setAddProduct(false);
                toast.success('Thêm sản phẩm thành công!');
            }

        } catch (err) {
            console.log("up ảnh xịt");
        }
    }

    const handleDelete = async () => {
        await deleteProduct(props.product.product_id, dispatch, user.token, axiosJWT);
        console.log("props.product.product_id: ", props.product.product_id);
        props.setDeleteProduct(!props.deleteProduct);
        toast.success('Xóa sản phẩm thành công!');
    }

    const handleSetQuantity = (e) => {
        const [...quantityCopy] = quantity;
        if (e.target.value == 0) {
            setTest(e.target.value);
            setQuantityError("Không thể bỏ trống số lượng sản phẩm !");
        } else {
            setTest(e.target.value);
            quantityCopy[size] = Number(e.target.value);
            setQuantity(quantityCopy);
            setQuantityError("");
        }

    }

    const handleProductName = async (e) => {
        const productName = e.target.value;
        if (productName == '') {
            setNameProductError('Không thể bỏ trống tên sản phẩm !');
            setProductName(e.target.value);
        } else {
            setProductName(e.target.value);
            setNameProductError('');
        }
    }

    const handleSetSize = (e) => {
        setSize(e.target.value);
        setTest(quantity[Number(e.target.value)]);
        console.log(quantity);
    }

    const handleSave = async () => {
        const editProduct = {
            product_id: props.product.product_id,
            product_name,
            product_type,
            new_product,
            quantity,
            discount,
            product_avatar,
            image_array,
            price,
            bought_count
        }
        //console.log("editProduct: ", editProduct);
        if (product_avatar == '' || product_name == ''
            || image_array == '' || quantity == '') {
            if (product_avatar == '') {
                setAvatarError("Không thể trống ảnh đại diện !");
            }
            if (product_name == '') {
                setNameProductError("Không thể bỏ trống tên sản phẩm !");
            }
            if (image_array == '') {
                setMultipleImageError("Không thể bỏ trống ảnh miêu tả sản phẩm !");
            }
            if (quantity == '') {
                setQuantityError("Không thể bỏ trống số lượng sản phẩm !");
            }
        } else {
            try {
                await updateProduct(editProduct, dispatch, user.token, axiosJWT);
                setEdit(!edit);
                props.setSave(!props.save);
                setImagesCount(`${image_array.length} Ảnh`);
                toast.success('Sửa sản phẩm thành công!');
            } catch (err) {
                console.log("Sửa xịt");
            }
        }

    }
    useEffect(() => {
        setProductName(props.product.product_name);
        setProductType(props.product.product_type);
        setProductAvatar(props.product.product_avatar);
        setNewProduct(props.product.new_product);
        setSize(0);
        setQuantity(props.product.quantity);
        setPrice(props.product.price);
        setDiscount(props.product.discount);
        setBoughtCount(props.product.bought_count);
        setImageArray(props.add ? [] : props.product.image_array);
        // const [edit, setEdit] = useState(false);
        setTest(props.product.quantity[0]);
        setImagesCount(props.add ? "Ảnh" : `${props.product.image_array.length} Ảnh`);
    }, [edit])
    return (
        <tr>
            <th scope="row">
                <label className="control control--checkbox">
                    {/* {new_product ? <input type="checkbox" value={new_product} checked /> : <input type="checkbox" value={new_product} />} */}
                    {props.add || edit ? <input type="checkbox" onChange={() => setNewProduct(!new_product)} checked={new_product ? true : false} />
                        : <input type="checkbox" onChange={() => setNewProduct(!new_product)} checked={new_product ? true : false} disabled />
                    }
                    <div className="control__indicator"></div>
                </label>
            </th>
            <td>
                {props.add ? "" : props.product.product_id}
            </td>
            <td className="image">
                <div className="products_image">
                    {props.add ?
                        <div>
                            <input id="avatar" type="file" name="file" className="inputfile" hidden onChange={(e) => handleUpAvatar(e)} />
                            <label htmlFor="avatar" id="avatar">{avatarCount} <i className='fas fa-camera'></i></label>
                            <div className='err-message-product err-message-product-avatar'>{avatarError}</div>
                        </div>

                        :
                        edit ?
                            <div>
                                <input id="avatar" type="file" name="file" className="inputfile" hidden onChange={(e) => handleUpAvatar(e)} />
                                <label htmlFor="avatar" className="avatar-img" style={{ backgroundImage: `url('/images/${props.product.product_avatar}')` }}></label>
                            </div>
                            :
                            <div className="avatar-img" style={{ backgroundImage: `url('/images/${props.product.product_avatar}')` }}></div>
                    }
                </div>
            </td>
            <td>
                {

                    props.add || edit ?
                        <>
                            <input className="input-product" value={product_name} placeholder="Tên sản phẩm" type="text" onChange={(e) => handleProductName(e)} />
                            <div className='err-message-product err-message-product-name'>{nameProductError}</div>
                        </>
                        :
                        props.product.product_name
                }
            </td>
            <td><div className="type-select">
                {
                    props.add || edit ?
                        <select className='products-table-select' value={product_type} onChange={(e) => setProductType(e.target.value)}>
                            <option value="tee">tee</option>
                            <option value="jacket">jacket</option>
                            <option value="accessory">accessory</option>
                            <option value="Pants">Pants</option>
                            <option value="hoodie">hoodie</option>
                            <option value="sweater">sweater</option>
                        </select>
                        :
                        props.product.product_type
                }

            </div></td>
            <td><div className="type-select">
                {/* {
                    props.add || edit ?
                        <select className='products-table-select' value={size} onChange={(e) => handleSetSize(e)}>
                            <option value="0">S</option>
                            <option value="1">M</option>
                            <option value="2">L</option>
                            <option value="3">XL</option>
                        </select> :
                        sizeText[size]
                } */}
                <select className='products-table-select' value={size} onChange={(e) => handleSetSize(e)}>
                    <option value="0">S</option>
                    <option value="1">M</option>
                    <option value="2">L</option>
                    <option value="3">XL</option>
                </select>
            </div></td>
            <td>
                {
                    props.add || edit ?
                        <>
                            <input className="input-product" type="text" value={test} id="small-box-2" onChange={(e) => handleSetQuantity(e)} />
                            <div className='err-message-product err-message-product-name'>{quantityError}</div>
                        </>

                        :
                        props.product.quantity[Number(size)]
                }
            </td>
            <td>
                {
                    props.add || edit ?
                        <input className="input-product" type="text" value={price} id="small-box-2" onChange={(e) => setPrice(Number(e.target.value))} />
                        :
                        props.product.price
                } đ

            </td>
            <td>
                {
                    props.add || edit ?
                        <input className="input-product" type="text" value={discount} id="small-box" onChange={(e) => setDiscount(Number(e.target.value))} />
                        :
                        props.product.discount
                } %</td>
            <td>
                {edit ?
                    <input className="input-product" type="text" value={bought_count} id="small-box" onChange={(e) => setBoughtCount(e.target.value)} />
                    :
                    props.product.bought_count
                }
            </td>
            {
                props.add || edit ?
                    <td>
                        <input id="images" type="file" multiple hidden onChange={(e) => handleUpImages(e)} />
                        <label htmlFor="images" id="detail-img" >{imagesCount}</label>
                        <div className='err-message-product err-message-product-multiple-image'>{multipleImageError}</div>
                    </td>
                    :
                    <td>
                        <input disabled id="images" type="file" multiple hidden onChange={(e) => handleUpImages(e)} />
                        <label disabled htmlFor="images" id="detail-img" >{imagesCount}</label>
                    </td>
            }

            <td>
                {
                    props.add ?
                        <button className="button add-button" onClick={() => handleAddProduct()}>Thêm</button>
                        :
                        <>
                            {/* <button className="button edit-button" onClick={() => setEdit(!edit)}>{edit ? "Lưu" : "Sửa"}</button> */}
                            {edit ?
                                <button className="button edit-button" onClick={() => handleSave()}><i className="fa fa-save"></i></button>
                                :
                                <button className="button edit-button" onClick={() => setEdit(!edit)}><i className='fas fa-edit'></i></button>

                            }
                            <button className="button delete-button" onClick={() => setIsOpen(!isOpen)} ><i className='far fa-trash-alt'></i></button>
                        </>
                }

            </td>
            <Modal isOpen={isOpen} centered style={{ fontSize: "1.6rem" }} toggle={() => setIsOpen(!isOpen)}>
                <div className="modal-header">
                    Cảnh báo
                </div>
                <ModalBody>
                    Sau khi thực hiện thao tác này sẽ không thể hoàn tác. Bạn vẫn muốn thực hiện ?
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { handleDelete(); setIsOpen(!isOpen) }}
                        style={{ fontSize: "1.4rem" }}
                    >
                        OK
                    </Button>
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ fontSize: "1.4rem" }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </tr >
    );
}

export default Product;