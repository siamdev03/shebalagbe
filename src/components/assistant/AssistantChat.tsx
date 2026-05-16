"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import QuickReplies from "./QuickReplies";

type Props = {
  setOpen: (
    value: boolean
  ) => void;
};

export default function AssistantChat({
  setOpen,
}: Props) {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([
      {
        sender: "bot",
        text:
          "👋 হ্যালো! আজকে কীভাবে সাহায্য করতে পারি?",
      },
    ]);

  async function sendMessage(
    customMessage?: string
  ) {

    const finalMessage =
      customMessage || message;

    if (!finalMessage) return;

    const userMessage = {
      sender: "user",
      text: finalMessage,
    };

    const botReply = {
      sender: "bot",
      text:
        "ধন্যবাদ ❤️ আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে।",
    };

    /* UPDATE UI */

    setMessages((prev) => [
      ...prev,
      userMessage,
      botReply,
    ]);

    /* SAVE TO SUPABASE */

    const { error } =
      await supabase
        .from("assistant_messages")
        .insert([{

          customer_message:
            finalMessage,

          bot_reply:
            botReply.text,

        }]);

    /* ERROR DEBUG */

    if (error) {

      console.log(
        "SUPABASE ERROR:",
        error
      );

    } else {

      console.log(
        "Message Saved ✅"
      );

    }

    /* RESET INPUT */

    setMessage("");
  }

  return (

    <div className="fixed bottom-56 right-6 z-[9999] w-[380px] max-w-[95vw] rounded-[32px] overflow-hidden bg-[#081129] border border-white/10 shadow-2xl">

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">

        <div>

          <h3 className="text-white text-xl font-bold">

            Need Help? 💬

          </h3>

          <p className="text-slate-400 text-sm mt-1">

            আমরা সাহায্যের জন্য আছি

          </p>

        </div>

        <button
          onClick={() =>
            setOpen(false)
          }
          className="text-white text-2xl hover:text-red-400 transition-all"
        >

          ✕

        </button>

      </div>

      {/* CHAT */}

      <div className="h-[350px] overflow-y-auto p-5 space-y-4">

        {messages.map(
          (msg, index) => (

            <div
              key={index}
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-7 ${
                msg.sender ===
                "user"
                  ? "ml-auto bg-cyan-500 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
            >

              {msg.text}

            </div>

          )
        )}

      </div>

      {/* QUICK REPLIES */}

      <QuickReplies
        setMessage={setMessage}
        sendMessage={sendMessage}
      />

      {/* INPUT */}

      <div className="p-4 border-t border-white/10 flex items-center gap-3">

        <input
          type="text"
          placeholder="আপনার মেসেজ লিখুন..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="flex-1 h-12 rounded-2xl bg-slate-900 border border-white/10 px-4 text-white outline-none focus:border-cyan-400"
        />

        <button
          onClick={() =>
            sendMessage()
          }
          className="px-5 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300"
        >

          পাঠান

        </button>

      </div>

    </div>

  );
}