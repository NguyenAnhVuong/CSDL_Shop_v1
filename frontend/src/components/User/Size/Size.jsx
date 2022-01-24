import './Size.scss';

const Size = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="size">
                    <h1 className='title'>Size Chart</h1>
                    <h1 className='tutorial-title'>HƯỚNG DẪN CHỌN SIZE ÁO TSUN CHUẨN</h1>
                    <div className='size-type'>*Size Áo</div>
                    <div className='note'>* Thông số cơ bản của các sản phẩm TSUN: Lấy chiếc áo mà các bạn đang mặc và cảm thấy vừa nhất sau đó đo các kích thước của áo,và đối chiếu với bảng thông số của chúng tôi theo các kích thước sau:</div>
                    <div className='product-type'>
                        <span className='index'>1. </span>
                        <span className='product-type-name'>Áo thun</span>
                    </div>
                    <div className='size-table tee-table'></div>
                    <div className='product-type'>
                        <span className='index'>2. </span>
                        <span className='product-type-name'>Áo Sơ mi</span>
                    </div>
                    <div className='size-table somi'></div>
                    <div className='product-type'>
                        <span className='index'>3. </span>
                        <span className='product-type-name'>Áo Hoodie</span>
                    </div>
                    <div className='size-table hoodie'></div>
                    <div className='product-type'>
                        <span className='index'>4. </span>
                        <span className='product-type-name'>Áo Sweater</span>
                    </div>
                    <div className='size-table sweater'></div>
                    <div className='product-type'>
                        <span className='index'>5. </span>
                        <span className='product-type-name'>Áo Hoodie có dây kéo Zip</span>
                    </div>
                    <div className='size-table ziphoodie'></div>
                    <div className='product-type'>
                        <span className='index'>6. </span>
                        <span className='product-type-name'>Áo Polo</span>
                    </div>
                    <div className='size-table polo'></div>
                    <div className='product-type'>
                        <span className='index'>7. </span>
                        <span className='product-type-name'>Áo khoác - Jacket</span>
                    </div>
                    <div className='size-table jacket'></div>

                    <div className='size-type'>*Size Quần</div>
                    <div className='product-type'>
                        <span className='index'>1. </span>
                        <span className='product-type-name'>Quần Short Basic Dù</span>
                    </div>
                    <div className='size-table tsunshort'></div>
                    <div className='product-type'>
                        <span className='index'>2. </span>
                        <span className='product-type-name'>Quần Terry Short</span>
                    </div>
                    <div className='size-table terryshort'></div>
                    <div className='product-type'>
                        <span className='index'>3. </span>
                        <span className='product-type-name'>Quần Mascot Short</span>
                    </div>
                    <div className='size-table mascotshort'></div>
                    <div className='product-type'>
                        <span className='index'>4. </span>
                        <span className='product-type-name'>Quần Sweatpant</span>
                    </div>
                    <div className='size-table sweatpants'></div>
                    <div className='product-type'>
                        <span className='index'>5. </span>
                        <span className='product-type-name'>Quần Tây</span>
                    </div>
                    <div className='size-table trouserspants'></div>
                    <div className='product-type'>
                        <span className='index'>6. </span>
                        <span className='product-type-name'>Quần dù phản quang</span>
                    </div>
                    <div className='size-table reflectivepant'></div>

                    <div className='foot-note'>
                        <p className='foot-note-title'>Trường hợp số đo của bạn nằm trong khoảng giữa các size với nhau:</p>
                        <p>Với quần short, bạn hãy lựa chọn ưu tiên theo cân nặng.</p>
                        <p>Ví dụ chiều cao của bạn theo size M nhưng cân nặng theo size L, hãy chọn L.</p>
                        <p>95% khách hàng của TSUN đã chọn đúng size theo cách này.</p>
                        <p>* Lưu ý: Các hướng dẫn về chọn Size chỉ mang tính tương đối chính xác, nếu bạn chưa chắc chắn xin vui lòng liên hệ trực tiếp với TSUN để được tư vấn.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Size;