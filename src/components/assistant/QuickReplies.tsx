type Props = {
  setMessage: (
    value: string
  ) => void;

  sendMessage: (
    text: string
  ) => void;
};

export default function QuickReplies({
  setMessage,
  sendMessage,
}: Props) {

  const replies = [

    "সার্ভিস বুক করতে চাই",

    "প্রোভাইডার দরকার",

    "Emergency Service লাগবে",

    "মূল্য জানতে চাই",

  ];

  return (

    <div className="px-4 pb-4 flex flex-wrap gap-2">

      {replies.map(
        (reply) => (

          <button
            key={reply}
            onClick={() => {

              setMessage(reply);

              sendMessage(reply);

            }}
            className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm hover:bg-cyan-500 hover:text-white transition-all duration-300"
          >

            {reply}

          </button>

        )
      )}

    </div>

  );
}