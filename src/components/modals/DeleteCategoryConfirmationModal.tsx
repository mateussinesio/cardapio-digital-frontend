import "./delete-category-confirmation-modal.css";

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export function DeleteConfirmationModal({ isVisible, handleClose, handleConfirm }: DeleteConfirmationModalProps) {
    if (!isVisible) return null;

    return (
        <div className="item-modal-overlay">
            <div className="item-modal-container">
                <h2>Tem certeza que deseja deletar esta categoria?</h2>
                <div className="item-modal-buttons-container">
                    <button onClick={handleConfirm} className="item-modal-submit-button">Confirmar</button>
                    <button onClick={handleClose} className="item-modal-close-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
}