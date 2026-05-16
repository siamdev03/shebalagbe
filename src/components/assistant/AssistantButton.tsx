type Props = {
  open: boolean;

  setOpen: (
    value: boolean
  ) => void;
};

export default function AssistantButton({
  open,
  setOpen,
}: Props) {

  return (

    <button
      onClick={() =>
        setOpen(!open)
      }
      className="fixed bottom-40 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-all duration-300"
    >

      💬

    </button>

  );
}