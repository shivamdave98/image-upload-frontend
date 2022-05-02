import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useUserId, useToken } from '../auth';
import placeholder from '../assets/no-image.png';
import { ErrorToaster, SuccessToaster, WarningToaster } from '../assets/toast';
import { Container, ImageWrapper } from './styled';

export const GalleryPage = () => {
    const [imageUrlList, setImageUrlList] = useState<string[]>([]);
    const { userId } = useUserId();

    const body = { 'user_id': userId }

    useEffect(() => {
        fetch('/gallery', {
            method: 'POST',
            body: JSON.stringify(body)
        }).then((r) => r.json()).then((response) => {
            if (response.error) {
                ErrorToaster(`${response.status_code}: ${response.error}- ${response.message}`);
            } else if (response.images.length === 0) {
                alert('Please upload a picture to view your gallery here :)')
            }
            else {
                setImageUrlList(response.images);
            }
        });
    }, []);

    return (
        <>
            <Container>
                {imageUrlList.map((url) => {
                    return (<ImageWrapper>
                        <img src={require(`/api/uploads/${userId}/${url}`)} alt='logo' width={'500px'} height={'500px'} />
                    </ImageWrapper>)
                })}
            </Container>
            <ToastContainer />
        </>
    );
}