import "./delete-item-confirmation-modal.css";

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export function DeleteConfirmationModal({ isVisible, handleClose, handleConfirm }: DeleteConfirmationModalProps) {
    if (!isVisible) return null;

    return (
        <div className="delete-item-modal-overlay">
            <div className="delete-item-modal-container">
                <h2>Tem certeza que deseja deletar este item?</h2>
                <div className="delete-item-modal-buttons-container">
                    <button onClick={handleConfirm} className="delete-item-modal-submit-button">Confirmar</button>
                    <button onClick={handleClose} className="delete-item-modal-cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
}