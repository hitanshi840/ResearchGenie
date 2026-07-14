import UploadSection from "../upload/UploadSection";

type Props = {
  onUploadSuccess: () => void;
};

export default function DashboardTop({
  onUploadSuccess,
}: Props) {
  return (
    <div className="grid grid-cols-1">
      <UploadSection onUploadSuccess={onUploadSuccess} />
    </div>
  );
}