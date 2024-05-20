import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNum = Number(photoId);
  if (Number.isNaN(idNum)) {
    throw new Error("Invalid ID");
  }

  return (
    <Modal>
      <FullPageImageView id={idNum} />
    </Modal>
  );
}
