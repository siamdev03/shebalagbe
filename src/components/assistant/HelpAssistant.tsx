"use client";

import { useState } from "react";

import AssistantButton from "./AssistantButton";

import AssistantChat from "./AssistantChat";

export default function HelpAssistant() {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      <AssistantButton
        open={open}
        setOpen={setOpen}
      />

      {open && (

        <AssistantChat
          setOpen={setOpen}
        />

      )}

    </>

  );
}