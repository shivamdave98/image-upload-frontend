import React, { ReactComponentElement } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ErrorToaster(message: String, ttl?: number | null | undefined) {
    toast.error(message, {
        position: 'bottom-left',
        autoClose: ttl ? ttl : false,
        draggable: true
    });
}

export function SuccessToaster(message: String, ttl: number) {
    toast.success(message, {
        position: 'bottom-left',
        autoClose: ttl ? ttl : false,
        draggable: false,
    });
}

export function WarningToaster(message: String, ttl: number) {
    toast.warn(message, {
        position: 'bottom-left',
        autoClose: ttl ? ttl : false,
        draggable: false
    });
}