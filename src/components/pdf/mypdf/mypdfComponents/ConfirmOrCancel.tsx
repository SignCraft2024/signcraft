import React, { CSSProperties } from "react";
import { BigButton } from "./BigButton";

type ConfirmOrCancelProps = {
	onCancel: () => void;
	onConfirm: () => void;
	confirmTitle?: string;
	leftBlock?: React.ReactNode;
	hideCancel?: boolean;
	disabled?: boolean;
};

export const ConfirmOrCancel: React.FC<ConfirmOrCancelProps> = ({
  onCancel,
  onConfirm,
  confirmTitle = "Confirm",
  leftBlock,
  hideCancel,
  disabled
}) => {
  const styles: Record<string, CSSProperties> = {
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    cancel: {
      marginRight: 8,
    },
  };

  return (
    <div style={styles.actions}>
      <div>{leftBlock}</div>
      <div>
        {!hideCancel ? (
          <BigButton
            title={"Cancel"}
            style={styles.cancel}
            onClick={onCancel}
          />
        ) : null}
        <BigButton title={confirmTitle} inverted={true} onClick={onConfirm} disabled={disabled}/>
      </div>
    </div>
  );
}
