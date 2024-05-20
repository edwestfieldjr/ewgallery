import FullPageImageView from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNum = Number(photoId);
  if (Number.isNaN(idNum)) {
    throw new Error("Invalid ID");
  }
  return (
    <div>
      <FullPageImageView id={idNum} />
    </div>
  );
}
