export const getCurrentStagesStyle = (status: string) => {
    switch (status) {
        case "Akun belum terverifikasi":
            return "px-2 py-2 rounded-md text-sm bg-red-700 text-white";
        case "lolos":
            return "px-2 py-2 rounded-md text-sm bg-green-800 text-white";
        default:
            return "px-2 py-2 rounded-md text-sm bg-gray-200";
    }
};