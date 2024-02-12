import Draggable from "react-draggable";
import { FaCheck, FaTimes } from "react-icons/fa";
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { errorColor, goodColor, primary45 } from "../../../../utils/colors";

type DraggableTextProps = {
	onEnd?: (params: any) => void;
	onSet: (params: string) => void;
	onCancel?: () => void;
	initialText?: string | null;
};

const DraggableText: React.FC<DraggableTextProps> = ({ onEnd, onSet, onCancel, initialText }) => {
  const [text, setText] = useState("Text");
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText)
    } else {
      inputRef.current.focus();
      inputRef.current.select()
    }
  }, [])

  const styles: Record<string, CSSProperties> = {
    container: {
      position: "absolute",
      zIndex: 100000,
      border: `2px solid ${primary45}`,
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: primary45,
      // borderRadius: 4,
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
    input: {
      border: 0,
      fontSize: 20,
      padding: 3,
      backgroundColor: 'rgba(0,0,0,0)',
      cursor: 'move'
    }
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <button style={styles.smallButton} onClick={()=>onSet(text)}>
            <FaCheck color={goodColor} />
          </button>
          <button style={styles.smallButton} onClick={onCancel}>
            <FaTimes color={errorColor} />
          </button>
        </div>
        <input
          ref={inputRef}
          style={styles.input}
          value={text}
          placeholder={'Text'}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </Draggable>
  );
}

export default DraggableText;