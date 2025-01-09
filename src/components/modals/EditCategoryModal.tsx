import { useState, useEffect } from "react";
import { CategoryData } from "../../interface/category-data";
import { updateCategory } from "../../hooks/update-category";

import "./edit-category-modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

interface EditCategoryModalProps {
    isVisible: boolean;
    handleClose: () => void;
    initialData: CategoryData;
}

export function EditCategoryModal({ isVisible, handleClose, initialData }: EditCategoryModalProps) {
    const [name, setName] = useState(initialData.name);
    const [image, setImage] = useState<string | undefined>(initialData.image);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [removeImage, setRemoveImage] = useState(false);
    const { mutate } = updateCategory(initialData.id ? initialData.id.toString() : "");

    useEffect(() => {
        setName(initialData.name);
        setImage(initialData.image);
        setRemoveImage(false);
    }, [initialData]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(undefined);
        setImageFile(null);
        setRemoveImage(true);
    };

    const isFormChanged = name !== initialData.name || imageFile !== null || removeImage;

    const submit = () => {
        const categoryData: CategoryData = {
            id: initialData.id ? initialData.id.toString() : "",
            name: name === initialData.name ? initialData.name : name,
            image: imageFile ? imageFile.name : image,
            removeImage: removeImage
        };

        mutate({ categoryData, imageFile, removeImage });
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="edit-category-overlay">
            <div className="edit-category-container">
                <h2>Editar categoria</h2>
                <form className="edit-category-input-container">
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                    <label>Imagem:</label>
                    <input type="file" onChange={handleImageChange} />
                    {image && !imageFile && (
                        <div className="edit-category-image-preview">
                            <img src={image.startsWith('http') ? image : `http://localhost:8080${image}`} alt="Preview" />
                            <button type="button" onClick={handleRemoveImage}>Remover imagem</button>
                        </div>
                    )}
                    {imageFile && (
                        <div className="edit-category-image-preview">
                            <img src={URL.createObjectURL(imageFile)} alt="Preview" />
                            <button type="button" onClick={handleRemoveImage}>Remover imagem</button>
                        </div>
                    )}
                </form>
                <div className="edit-category-buttons-container">
                    <button
                        onClick={submit}
                        className="edit-category-submit-button"
                        disabled={!isFormChanged}
                    >
                        Salvar
                    </button>
                    <button onClick={handleClose} className="edit-category-close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}
