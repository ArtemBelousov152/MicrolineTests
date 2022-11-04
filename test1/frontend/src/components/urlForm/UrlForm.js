import { useState } from 'react';

import './urlForm.scss'

const UrlForm = () => {
    const [url, setUrl] = useState('');
    const [file, setFile] = useState({});
    const [requestStatus, setRequestStatus] = useState('idle');

    const getFile = async () => {
        setRequestStatus('loading')
        const response = await fetch(`http://localhost:8000/api/getdata?url=${url}`)
        if (response.status === 200) {
            setRequestStatus('done');
            setFile(response)
        } else {
            setRequestStatus('error');
        }
    }

    const downloadFile = async (file) => {
            const blob = await file.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = url.split('/').slice(-1)[0];
            link.click();
            link.remove();
            setRequestStatus('idle');
    }

    const popupWindow = () => {
        if (requestStatus === 'error') {
            return <div className='error'>Произошла ошибка</div>
        } else if (requestStatus === 'done') {
            return (
                <>
                    <div className="urlForm__question">
                        Хотите сохранить этот файл на диск?
                    </div>
                    <div className="wrapper">
                        <button
                            className='btn btn-outline-success'
                            onClick={() => downloadFile(file)}>
                                Сохранить
                        </button>
                        <button
                            className='btn btn-outline-dark'
                            onClick={() => setRequestStatus('idle')}>
                                Отменить
                        </button>
                    </div>
                </>
            )
           
        }
    }

    return (
        <div className="urlForm">
            <label className='urlForm__label' htmlFor="url">Введите url адрес</label>
            <input
                className="urlForm__input form-text"
                id='url' 
                name='url' 
                type="text"
                value={url}
                onChange={(e) => {setUrl(e.target.value)}}/>
            <button
                className="btn btn-outline-dark"
                onClick={() => getFile(url)}
                disabled={requestStatus !== 'idle' && requestStatus !== 'error'}>
                    Скачать
            </button>
            <div className="urlForm__download">
                {popupWindow()}
            </div>
        </div>
    ) 
}

export default UrlForm;