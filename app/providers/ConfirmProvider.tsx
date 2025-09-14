import { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    resolver?.(result);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{options.title ?? "Подтверждение"}</DialogTitle>
        {options.description && (
          <DialogContent>
            <DialogContentText>{options.description}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => handleClose(false)}>
            {options.cancelText ?? "Отмена"}
          </Button>
          <Button
            onClick={() => handleClose(true)}
            autoFocus
            color="primary"
          >
            {options.confirmText ?? "ОК"}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm должен использоваться внутри <ConfirmProvider>");
  }
  return ctx;
}
