import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          className="flex-shrink object-contain"
          alt={image.name}
        />
      </div>
      <div className="m-0 flex  w-1/5 min-w-48 flex-col border-l p-4">
        <div className="text-xl font-bold">{image.name}</div>
        <div className="text-sm">{image.id}</div>
      </div>
    </div>
  );
}
