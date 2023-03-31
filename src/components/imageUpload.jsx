import { useState } from "react";


// Render the image in a React component.
const ImageUpload = () => {
    const [image, setImage] = useState();

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('cloud_name', 'deopxwaiz');
        formData.append('upload_preset', "demo-image");

        fetch('https://api.cloudinary.com/v1_1/deopxwaiz/image/upload', {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
        .then((data) => {
            console.log('the data is', data)
            if (data.secure_url !== '') {
                const uploadedFileUrl = data.secure_url;

                localStorage.setItem('passportUrl', uploadedFileUrl);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            <button onClick={uploadFile}></button>
        </>
    );
}

export default ImageUpload;