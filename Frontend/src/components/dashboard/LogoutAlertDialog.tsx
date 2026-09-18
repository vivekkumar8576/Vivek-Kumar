import { AlertDialog, Button } from "@heroui/react";
import { Logout2 } from "reicon-react";

type Props = {
  onConfirmLogout: () => void;
};

export const LogoutAlertDialog = ({ onConfirmLogout }: Props) => (
  <AlertDialog>
    <Button className="ghost-button" variant="ghost">
      <Logout2 size={15} /> Logout
    </Button>

    <AlertDialog.Backdrop className="bg-[color:oklch(0.15_0.02_150/0.55)] backdrop-blur-sm">
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[420px] border border-[var(--line-soft)] bg-[var(--surface-base)] text-[var(--ink-strong)]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="warning" />
            <AlertDialog.Heading>Logout from KrishiVani?</AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <p className="text-sm text-[var(--ink-muted)]">
              You will be signed out from this device. You can log in again anytime using your
              registered credentials.
            </p>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary" className="border border-[var(--line-soft)]">
              Cancel
            </Button>
            <Button slot="close" className="bg-[var(--tone-leaf)] text-white" onClick={onConfirmLogout}>
              Confirm Logout
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
);