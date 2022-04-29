import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { FileUploader } from 'react-drag-drop-files';
import ReactiveButton from 'reactive-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import placeholder from '../assets/logo.svg';

import { FileUploaderWrapper, PlaceholderImageWrapper, UploadButtonWrapper } from './styled';

const fileTypes = ["JPEG", "PNG", "SVG"];

const successToaster = () => {
    toast.success('Successfully uploaded image!', {
        position: 'bottom-left',
        autoClose: 3000,
        draggable: false,
    });
}

const warningToaster = () => {
    toast.warn('Please upload an image!', {
        position: 'bottom-left',
        autoClose: 3000,
        draggable: false
    })
}

export const UploadImagePage = () => {
    const [imageFileUpload, setImageFileUpload] = useState(null);

    function uploadImage() {
        if (imageFileUpload === null) {
            warningToaster();
            return;
        }
        // fix the path at which the image get stored
        // something like userId/{image_file_path}
        const imageRef = ref(storage, `another test`)
        uploadBytes(imageRef, imageFileUpload).then((snapshot) => {
            successToaster();
            setImageFileUpload(null);
            console.log("the snapshot is", snapshot);
            const imageStorageUrl = snapshot.metadata.bucket + '/' + snapshot.metadata.fullPath;
            console.log(imageStorageUrl)
        })
    }

    const handleChange = (file: any) => {
        setImageFileUpload(file);
    }
    return (
        <>
            <FileUploaderWrapper>
                <PlaceholderImageWrapper>
                    <img src={imageFileUpload ? URL.createObjectURL(imageFileUpload) : placeholder} alt='logo' width={'500px'} height={'500px'} />
                </PlaceholderImageWrapper>
                <FileUploader
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <UploadButtonWrapper>
                    <ReactiveButton
                        onClick={uploadImage}
                        idleText={'Upload'}
                        type={'button'}
                        outline={true}
                        shadow={true}
                        rounded={true}
                        animation={true}
                    />
                </UploadButtonWrapper>
            </FileUploaderWrapper>
            <ToastContainer />
        </>
    )
}