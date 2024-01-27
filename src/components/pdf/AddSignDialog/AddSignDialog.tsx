import './AddSignDialog.css'
import React, { useRef } from 'react'

type AddSignDialogProps = {
  autoDate: boolean;
  setAutoDate: (params: any) => void;
  onClose: () => void;
  onConfirm: (url: string) => void;
}
export const AddSignDialog: React.FC<AddSignDialogProps> = ({autoDate, setAutoDate, onClose, onConfirm}) => {
  const signRef = useRef(null);
  return (
    <div></div>
  )
};