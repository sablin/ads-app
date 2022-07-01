import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context';

const ImageControls = () => {


    const [images, setImages] = useState([]);
    const [formInfo, setFormInfo] = useState({
    description: '',
    url: '',
    cost: 0
})
const [file, setFile] = useState();
const {isAuth, setIsAuth, loginUser, setLoginUser, token, setToken} = useContext(AuthContext);

useEffect(()=>{

    const response = axios.get('http://ruizzi.ru/api/advertisement/',{headers: {
        Authorization: `Bearer ${token}`
        }}).then((res)=>{
            console.log(res.data);
            setImages(res.data)
        })

   

}, [])

const deleteImage = (id) =>{
    axios.delete(`http://ruizzi.ru/api/advertisement/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }).then(res => {
        const response = axios.get('http://ruizzi.ru/api/advertisement/',{headers: {
            Authorization: `Bearer ${token}`
            }}).then((res)=>{
                console.log(res.data);
                setImages(res.data)
            })
      });

}

const UploadContent = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
        setFile(event.target.files[0]);
    }
};

const addImage = (e) =>{
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', file);
    formData.append('description', formInfo.description);
    formData.append('url', formInfo.url);
    formData.append('cost', formInfo.cost);
    axios.post('http://ruizzi.ru/api/advertisement/',  
    formData,
        {headers: {
            Authorization: `Bearer ${token}`
        }
    }
        ).then(res => {
            const response = axios.get('http://ruizzi.ru/api/advertisement/', {headers: {
                Authorization: `Bearer ${token}`
                }}).then((res)=>{
                
                    setImages(res.data)
                })
        })
}

const handleForm = (e) =>{
    const target = e.target;
    const value= target.value;
    const name = target.name;

    setFormInfo({
      ...formInfo,
      [name]: value
    });
}

    return (
        <div>
             <div>
                 {images.map(image => {
                     return <img onClick={() => deleteImage(image.id)} key={image.id} src={image.image} alt="" style={{width:250}}/>
                 })}
        </div>
        <form onSubmit={addImage}>
            <input type="file" onChange={UploadContent}/>
            <input type="text" onChange={handleForm} placeholder='Описание рекламы' name="description" />
            <input type="text" onChange={handleForm} placeholder='Рекламная ссылка' name="url"/>
            <input type="text" onChange={handleForm} placeholder='Стоимоcть' name="cost"/>
            <input type="submit" value="Добавить изображение"/>
        </form>
        </div>
       
    );
};

export default ImageControls;