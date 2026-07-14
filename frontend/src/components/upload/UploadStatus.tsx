type Props = {
  message: string;
};

export default function UploadStatus({ message }: Props) {
  if (!message) return null;

  return (
    <div className="mt-3 rounded-lg bg-green-100 border border-green-300 p-3 text-green-800">
      {message}
    </div>
  );
}