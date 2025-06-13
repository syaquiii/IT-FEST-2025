"use client"
import { useState } from "react";
import { excelService } from "@/api/services/admin"; // Adjust path as needed

interface UseDownloadTeamsReturn {
    isDownloading: boolean;
    error: string | null;
    success: boolean;
    downloadTeams: () => Promise<void>;
}

interface UseDownloadPaymentsReturn {
    isDownloading: boolean;
    error: string | null;
    success: boolean;
    downloadPayments: () => Promise<void>;
}

export const useDownloadTeams = (): UseDownloadTeamsReturn => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const downloadTeams = async () => {
        try {
            setIsDownloading(true);
            setError(null);
            setSuccess(false);
            const response = await excelService.downloadTeamsData();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'teams-data.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setSuccess(true);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to download teams");
            console.error("Error downloading teams:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        isDownloading,
        error,
        success,
        downloadTeams
    };
};

export const useDownloadPayments = (): UseDownloadPaymentsReturn => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const downloadPayments = async () => {
        try {
            setIsDownloading(true);
            setError(null);
            setSuccess(false);
            const response = await excelService.downloadPaymentData();

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'payments-data.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setSuccess(true);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to download payments");
            console.error("Error downloading payments:", err);
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        isDownloading,
        error,
        success,
        downloadPayments,
    };
};