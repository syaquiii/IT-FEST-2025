export const getSubmissionStatusLabel = (status: string) => {
  switch (status.toLowerCase()) {
    case "lolos":
      return (
        <span className="text-green-400 font-semibold">
          ✅ Lolos seleksi
        </span>
      );
    case "tidak lolos":
      return (
        <span className="text-red-400 font-semibold">
          ❌ Tidak lolos
        </span>
      );
    case "diproses":
      return (
        <span className="text-yellow-400 font-semibold">
          ⏳ Sedang diproses
        </span>
      );
    default:
      return (
        <span className="text-gray-400 font-semibold">
          Belum ada status
        </span>
      );
  }
};
