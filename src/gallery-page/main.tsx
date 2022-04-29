import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { url } from 'inspector';

export const GalleryPage = () => {
    const [imageUrlList, setImageUrlList] = useState<string[]>([]);

    const imageUrlListRef = ref(storage, '/');
    useEffect(() => {
        listAll(imageUrlListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    // might wanna reconsider useState
                    setImageUrlList(imageUrlList.concat([url]));
                })
            })
        })
    }, [])
    console.log(imageUrlList);
    return (
        <>
            <h1>Gallery</h1>
            {imageUrlList.map((url) => {
                return <img src={url} width={'100px'} height={'100px'} />
            })}
        </>
    );
}