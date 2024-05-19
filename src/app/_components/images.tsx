import { db } from "~/server/db";

export async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt={image.name} className="w-full" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}
