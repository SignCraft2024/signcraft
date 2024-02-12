import Draggable from "react-draggable";
import {FaCheck, FaTimes} from 'react-icons/fa'
import { errorColor, goodColor, primary45 } from "../../../../utils/colors";
import React, { CSSProperties } from "react";

type DraggableSignatureProps = {
	url: string;
	onEnd: (params: any) => void;
	onSet: () => void;
	onCancel: () => void;
};

const DraggableSignature: React.FC<DraggableSignatureProps> = ({ url, onEnd, onSet, onCancel }) => {
  const styles: Record<string, CSSProperties> = {
    container: {
      position: 'absolute',
      zIndex: 100000,
      border: `2px solid ${primary45}`,
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: primary45,
      // borderRadius: 4,
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      padding: 4,
    }
  }
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <button style={styles.smallButton} onClick={onSet}><FaCheck color={goodColor}/></button>
          <button style={styles.smallButton} onClick={onCancel}><FaTimes color={errorColor}/></button>
        </div>
        <img src={url} width={200} style={styles.img} alt="signature" draggable={false} />
      </div>
    </Draggable>
  );
}

export default DraggableSignature