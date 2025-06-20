"use client";

import { Button } from "@/shared/components/ui/Button";
import { useState, FormEvent } from "react";
import { usePostAnnouncement } from "../hooks/usePostAnnouncement";
import { CheckCircle2, Loader2, } from "lucide-react";

interface AnnouncementFormProps {
    onSuccess?: () => void;
}

const AnnouncementForm = ({ onSuccess }: AnnouncementFormProps) => {
    const [message, setMessage] = useState("");
    const { postAnnouncement, loading, error, success, reset } = usePostAnnouncement();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        const wasSuccessful = await postAnnouncement(message);

        if (wasSuccessful) {
            console.log("Submit successful, calling onSuccess callback!");
            setMessage("");
            onSuccess?.(); // Sekarang ini PASTI akan terpanggil
            reset(); // Anda bisa tetap memanggil reset di sini jika perlu
        }
    };

    return (
        <div className="font-changa text-white space-y-4 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-[300px]">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter announcement text"
                    className="w-full h-64 p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
                    disabled={loading}
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button
                    type="submit"
                    size="small"
                    disabled={loading || !message.trim()}
                    className="text-sm sm:text-base disabled:opacity-50 w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Announcing... (Estimation : 30 Seconds)
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Successfully Announced!
                        </>
                    ) : (
                        "Announce"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default AnnouncementForm;