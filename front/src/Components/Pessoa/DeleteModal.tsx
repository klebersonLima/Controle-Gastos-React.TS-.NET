import React from "react";
import { Pessoa } from "../../types/pessoa";

// Componente para mostrar o modal de confirmação de exclusão

interface DeleteModalProps {
  show: boolean; // aqui é para controlar o estado do modal para mostrar e não mostrar
  pessoa: Pessoa | undefined; // aqui é para mostrar o nome da pessoa selecionada
  onConfirm: () => void; // para confirmar
  onCancel: () => void; // para cancelar
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  pessoa,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Exclusão</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Tem certeza que deseja excluir a pessoa "
              <strong>{pessoa?.nome}</strong>"?
            </p>
            <p className="text-muted small mb-0">
              Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
