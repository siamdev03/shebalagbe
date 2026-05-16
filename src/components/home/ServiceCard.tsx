interface Props {
  title: string;
}

export default function ServiceCard({ title }: Props) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}