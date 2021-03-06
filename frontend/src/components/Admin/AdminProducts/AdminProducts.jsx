import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProductsFromAPI } from '../../../redux/apiRequest';
import Product from './Product/Product'
import './AdminProducts.scss';
const AdminProducts = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products.allProducts);
    // const [product_id, setProductId] = useState(products.length !== 0 ? products[products.length - 1].product_id + 1 : 1);
    const [product_name, setProductName] = useState("");
    const [product_type, setProductType] = useState("tee");
    const [product_avatar, setProductAvatar] = useState("");
    const [new_product, setNewProduct] = useState(1);
    const [quantity, setQuantity] = useState([500, 500, 500, 500]);
    const [price, setPrice] = useState(300000);
    const [discount, setDiscount] = useState(0);
    const [bought_count, setBoughtCount] = useState(0);
    const [addProduct, setAddProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [save, setSave] = useState(false);
    const newProduct = {
        // product_id,
        product_name,
        product_type,
        product_avatar,
        new_product,
        quantity,
        price,
        discount,
        bought_count
    }
    var ptr_arr = products ? [...products] : [];
    const setPtr_arr = (products) => {
        ptr_arr = products;
    }
    const [status, setStatus] = useState(1);
    const changeStatus = (ptr) => {
        //console.log("zxc: ", typeof products[0].bought_count);
        switch (parseInt(ptr)) {
            case 1:
                setPtr_arr([...products]);
                // console.log(products)
                // console.log("thanh cong1")
                break;
            case 2:
                setPtr_arr([...products].reverse())
                // console.log(ptr_arr)
                // console.log("thanh cong2")
                break;
            case 3:
                setPtr_arr([...products].sort((a, b) => a.price > b.price ? 1 : -1))

                // console.log(ptr_arr)
                // console.log("thanh cong3")
                break;
            case 4:
                setPtr_arr([...products].sort((a, b) => a.price < b.price ? 1 : -1))
                // console.log(ptr_arr)
                // console.log("thanh cong4")
                break;
            case 5:
                setPtr_arr([...products].sort((a, b) => a.bought_count < b.bought_count ? 1 : -1))
                // console.log(ptr_arr)
                // console.log("thanh cong5")
                break;
            case 6:
                setPtr_arr([...products].sort((a, b) => a.bought_count > b.bought_count ? 1 : -1))
                // console.log(ptr_arr)
                // console.log("thanh cong6")
                break
            default:
        }
    }
    products && changeStatus(status);
    useEffect(() => {
        const callAPI = async () => {
            if (!user || user.user.user_id !== 1) {
                navigate("/login");
            } else {
                await getAllProductsFromAPI(dispatch);
            }
        }
        callAPI();
        return () => {

        }
    }, [addProduct, deleteProduct, save]);

    return (
        <div className="container">
            <div className="content-page noi">
                <h1 className="order_heading">Danh s??ch s???n ph???m</h1>
                <div className="table-responsive custom-table-responsive">
                    <button className="button add-product" onClick={() => setAddProduct(!addProduct)}>Th??m s???n ph???m</button>


                    <select value={status} onChange={(event) => setStatus(Number(event.target.value))} className="button sort-product">
                        <option value="1" >ID: T??ng d???n</option>
                        <option value="2" >ID: Gi???m d???n</option>
                        <option value="3" >Gi??: T??ng d???n</option>
                        <option value="4" >Gi??: Gi???m d???n</option>
                        <option value="5" >S??? l?????ng ???? b??n: Gi???m d???n</option>
                        <option value="6" >S??? l?????ng ???? b??n: T??ng d???n</option>
                    </select>

                    <table className="table products-table">
                        <thead>
                            <tr>
                                <th scope="col">M???i</th>
                                <th scope="col">ID</th>
                                <th scope="col"></th>
                                <th scope="col">T??n</th>
                                <th scope="col">Lo???i</th>
                                <th scope="col">K??ch c???</th>
                                <th scope="col">S??? L?????ng</th>
                                <th scope="col">Gi??</th>
                                <th scope="col">Gi???m gi??</th>
                                <th scope="col">???? b??n</th>
                                <th scope="col">???nh</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {addProduct && <Product product={newProduct} add={addProduct} setAddProduct={setAddProduct} />}
                            {
                                ptr_arr?.map((product, index) => {
                                    return (
                                        <Product key={index} product={product} deleteProduct={deleteProduct} setDeleteProduct={setDeleteProduct} save={save} setSave={setSave} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default AdminProducts;