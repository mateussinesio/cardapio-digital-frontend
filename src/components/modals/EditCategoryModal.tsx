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
    const [image, setImage] = useState(initialData.image);
    const [imageFile, setImageFile] = useState<File | null>(null);  // New state for the selected file
    const { mutate } = updateCategory(initialData.id ? initialData.id.toString() : "");

    // Effect to reset image state if the modal is opened with the initial data
    useEffect(() => {
        setName(initialData.name);
        setImage(initialData.image);
    }, [initialData]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);  // Save the selected image file
            setImage(URL.createObjectURL(file));  // Display the image preview
        }
    };

    // Check if there were any changes
    const isFormChanged = name !== initialData.name || image !== initialData.image || imageFile !== null;

    const submit = () => {
        const categoryData: CategoryData = {
            id: initialData.id ? initialData.id.toString() : "",
            name: name === initialData.name ? initialData.name : name,  // Only update if changed
            image: imageFile ? imageFile.name : image  // Only update if image is changed
        };

        mutate({ categoryData, imageFile });
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="overlay">
            <div className="edit-category-container">
                <h2>Editar categoria</h2>
                <form className="input-container">
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                        <label>Imagem:</label>
                        <input type="file" onChange={handleImageChange} />
                </form>
                <div className="buttons-container">
                    <button
                        onClick={submit}
                        className="submit-button"
                        disabled={!isFormChanged}
                    >
                        Salvar
                    </button>
                    <button onClick={handleClose} className="close-button">Fechar</button>
                </div>
            </div>
        </div>
    );
}
