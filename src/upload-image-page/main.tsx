import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ReactiveButton from 'reactive-button';
import { ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import placeholder from '../assets/logo.svg';
import { ErrorToaster, SuccessToaster, WarningToaster } from '../assets/toast';
import { useUserId } from '../auth';

import { FileUploaderWrapper, PlaceholderImageWrapper, UploadButtonWrapper } from './styled';

const fileTypes = ["JPEG", "PNG", "SVG"];

export const UploadImagePage = () => {
    const { userId } = useUserId();

    const [imageFileUpload, setImageFileUpload] = useState(null);

    function uploadImage() {
        if (imageFileUpload === null) {
            WarningToaster("Please upload an image!", 3000);
            return;
        }

        if (userId === null || userId === undefined) {
            ErrorToaster("Error: Attempted to upload image before signing in", 3000);
            return;
        }

        console.log(imageFileUpload);

        const formData = new FormData();
        formData.append('file', imageFileUpload);
        formData.append('filename', `${uuidv4()}`);

        fetch('/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'user_id': userId
            }
        }).then((response) => {
            response.json().then(() => {
                SuccessToaster("200: Successfully uploaded image!", 3000);
            }).catch((error) => {
                ErrorToaster(`Error while uploading image: ${error}`, 3000);
            })
        });
    }

    const handleChange = (file: any) => {
        setImageFileUpload(file);
    }
    return (
        <>
            <FileUploaderWrapper>
                <PlaceholderImageWrapper>
                    <img src={imageFileUpload ? URL.createObjectURL(imageFileUpload) : placeholder} alt='logo' width={'500px'} height={'500px'}/>
                </PlaceholderImageWrapper>
                <FileUploader
                    multiple={false}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    maxSize={1}
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