import { useState } from "react";
import { addItem } from "../../hooks/add-item";
import { showCategories } from "../../hooks/show-categories";
import { deleteItem } from "../../hooks/delete-item";

import "./item-modal.css";

interface InputProps {
    label: string;
    value: string | number | readonly string[] | undefined | File;
    updateValue(value: any): void;
    type?: string;
    formatValue?: (value: any) => string;
}

const Input = ({ label, value, updateValue, type = "text", formatValue }: InputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "file" && event.target.files) {
            updateValue(event.target.files[0]);
        } else {
            updateValue(event.target.value);
        }
    };

    const formattedValue = formatValue ? formatValue(value) : value;

    return (
        <>
            <label>{label}</label>
            {type === "file" ? (
                <input type={type} onChange={handleChange} />
            ) : (
                <input type={type} value={formattedValue as string | number | readonly string[] | undefined} onChange={handleChange} />
            )}
        </>
    );
};

interface ItemModalProps {
    isVisible: boolean;
    handleClose: () => void;
    itemId?: string;
}

export function ItemModal({ isVisible, handleClose, itemId }: ItemModalProps) {
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | undefined>(undefined);
    const [price, setPrice] = useState(0);
    const { mutate } = addItem();
    const { data: categories, isLoading, error } = showCategories();

    const formatPrice = (price: { toLocaleString: (arg0: string, arg1: { minimumFractionDigits: number; maximumFractionDigits: number; }) => any; }) => {
        return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const submit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString().replace(',', '.'));
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        mutate(formData);
        handleClose();
    }

    const handleDelete = () => {
        if (itemId) {
            deleteItem(itemId);
            handleClose();
        }
    }

    if (!isVisible) return null;

    return (
        <div className="add-item-modal-overlay">
            <div className="add-item-modal-container">
                <h2>Adicionar um item no cardápio</h2>
                <form className="add-item-modal-input-container">
                    {isLoading ? (
                        <p>Carregando categorias...</p>
                    ) : error ? (
                        <p>Erro ao carregar as categorias.</p>
                    ) : (
                        <div className="select-category-container">
                            <label>Categoria:</label>
                            <select value={category} onChange={event => setCategory(event.target.value)}>
                                <option value="">Selecione uma categoria</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <Input label="Nome:" value={name} updateValue={setName}></Input>
                    <Input label="Descrição:" value={description} updateValue={setDescription}></Input>
                    <Input label="Imagem:" value={undefined} updateValue={setImage} type="file"></Input>
                    <Input label="Preço:" value={price} updateValue={setPrice} formatValue={formatPrice}></Input>
                </form>
                <div className="add-item-modal-buttons-container">
                    <button onClick={submit} className="add-item-modal-submit-button">Adicionar</button>
                    <button onClick={handleClose} className="add-item-modal-close-button">Fechar</button>
                    {itemId && (
                        <button onClick={handleDelete} className="add-item-modal-delete-button">Deletar</button>
                    )}
                </div>
            </div>
        </div>
    );
}