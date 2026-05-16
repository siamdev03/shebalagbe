"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase";

export default function UploadBeforeAfter() {

  const [title, setTitle] =
    useState("");

  const [beforeImage, setBeforeImage] =
    useState("");

  const [afterImage, setAfterImage] =
    useState("");

  const [description, setDescription] =
    useState("");

  const handleUpload =
    async () => {

      const { error } =
        await supabase
          .from("before_after_gallery")
          .insert([{

            title,

            before_image:
              beforeImage,

            after_image:
              afterImage,

            description,

          }]);

      if (error) {

        alert("Upload Failed");
        return;

      }

      alert("Upload Success");

      setTitle("");
      setBeforeImage("");
      setAfterImage("");
      setDescription("");

    };

  return (

    <div
      className="
        max-w-2xl
        mx-auto
        p-10
        bg-white/10
        rounded-3xl
        border border-white/10
      "
    >

      <h2 className="text-white mb-8">

        Upload Before / After

      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/10
            text-white
          "
        />

        <input
          type="text"
          placeholder="Before Image URL"
          value={beforeImage}
          onChange={(e) =>
            setBeforeImage(e.target.value)
          }
          className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/10
            text-white
          "
        />

        <input
          type="text"
          placeholder="After Image URL"
          value={afterImage}
          onChange={(e) =>
            setAfterImage(e.target.value)
          }
          className="
            w-full
            px-5
            py-4
            rounded-2xl
            bg-white/10
            text-white
          "
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
            w-full
            h-32
            px-5
            py-4
            rounded-2xl
            bg-white/10
            text-white
          "
        />

        <button
          onClick={handleUpload}
          className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            font-bold
          "
        >

          Upload Gallery

        </button>

      </div>

    </div>

  );

}