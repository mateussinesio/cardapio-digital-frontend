import "./delete-category-confirmation-modal.css";

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export function DeleteConfirmationModal({ isVisible, handleClose, handleConfirm }: DeleteConfirmationModalProps) {
    if (!isVisible) return null;

    return (
        <div className="delete-category-modal-overlay">
            <div className="delete-category-modal-container">
                <h2>Tem certeza que deseja deletar esta categoria?</h2>
                <div className="delete-category-modal-buttons-container">
                    <button onClick={handleConfirm} className="delete-category-modal-submit-button">Confirmar</button>
                    <button onClick={handleClose} className="delete-category-modal-cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
}