import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) {
    throw new Error("Not authenticated");
  }

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Not authenticated");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.userId !== user.userId) {
    throw new Error("Not authorized");
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  // delete image from uploadthing
  const utapi = new UTApi();
  const delImage = await getImage(id);
  if (!delImage) throw new Error("Image not found");
  const fileKey: string | undefined = delImage.url.split("/").pop();
  console.log(fileKey);
  if (!fileKey) throw new Error("File key not found");
  await utapi.deleteFiles([fileKey]);

  // delete image from database
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
