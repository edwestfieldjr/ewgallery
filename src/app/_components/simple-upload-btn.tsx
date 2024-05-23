"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import {
  UploadSVG,
  LoadingSpinnerSVG,
  NoNoSVG,
  ThumbsUpSVG,
} from "~/components/ui/icons";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function makeUploadToast() {
  return toast(
    <div className="flex flex-row gap-2">
      <LoadingSpinnerSVG />
      Uploading...
    </div>,
    { duration: 60000, id: "upload-begin" },
  );
}

export function SimpleUploadBtn() {
  const router = useRouter();
  const postHog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      postHog.capture("upload_begin");
      toast(
        <div className="flex items-center gap-2 text-lg ">
          <LoadingSpinnerSVG />
          Uploading...
        </div>,
        { duration: 60000, id: "upload-begin" },
      );
    },

    onUploadError(error) {
      postHog.capture("upload_error", { error });
      console.log(error);
      toast.dismiss("upload-begin");
      toast(
        <div className="flex items-center gap-2 text-lg text-red-500">
          <NoNoSVG />
          Upload Error!
        </div>,
        { id: "upload-error" },
      );
    },

    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast(
        <div className="flex items-center gap-2 text-lg ">
          <ThumbsUpSVG />
          Upload Complete!
        </div>,
        { id: "upload-complete" },
      );

      router.refresh();
    },
  });
  return (
    <div>
      <label htmlFor="upload-button" title="Upload" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
