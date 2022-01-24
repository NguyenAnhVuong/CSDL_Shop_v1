import { useState } from 'react';
import './Test.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { toast, ToastContainer } from 'react-toastify';
const Test = () => {
    const notify = () => toast.success('Cường hóa thành công!');
    return (
        <div>
            <button className='testfile' onClick={notify}>send</button>
        </div>
    );
}

export default Test;