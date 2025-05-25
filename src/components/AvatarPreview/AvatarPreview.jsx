// noinspection t,JSValidateTypes

import {useEffect, useRef, useState} from "react";
import Button from "../Button/Button.jsx";

const AVATAR_PLACEHOLDER = "/images/figures/avatar_placeholder.svg";

function AvatarPreview({initialURL, onFileChange, onDelete, onLogout}) {
    const [preview, setPreview] = useState(initialURL || AVATAR_PLACEHOLDER);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setPreview(initialURL || AVATAR_PLACEHOLDER);
    }, [initialURL]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 150;
                const MAX_HEIGHT = 150;

                let width = img.width;
                let height = img.height;

                // Пропорциональное уменьшение
                if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                    const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
                    width = width * ratio;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                // Сжатие до 0.5 качества
                const resizedBase64 = canvas.toDataURL("image/jpeg", 0.5);
                setPreview(resizedBase64);
                onFileChange(resizedBase64);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };


    const handleDelete = () => {
        setPreview(AVATAR_PLACEHOLDER);
        if (fileInputRef.current) fileInputRef.current.value = null;
        onFileChange(null);
        onDelete();
    };

    return (
        <div className="account-avatar-box">
            <img
                src={preview}
                alt="Avatar"
                className="avatar-preview"
            />
            <Button name="Delete Avatar" color="secondary" onClick={handleDelete}/>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileSelect}
            />
            <Button
                name="Upload New"
                color="purple"
                onClick={() => fileInputRef.current.click()}
            />
            <div style={{marginTop: "auto", width: '100%'}}>
                <Button name="Log Out" color="red" onClick={onLogout}/>
            </div>
        </div>
    );
}

export default AvatarPreview;
