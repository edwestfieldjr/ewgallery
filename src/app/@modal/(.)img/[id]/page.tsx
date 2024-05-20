import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idNum = Number(photoId);
  if (Number.isNaN(idNum)) {
    throw new Error("Invalid ID");
  }

  const image = await getImage(idNum);
  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}
