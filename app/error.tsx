"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-50 px-4">
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-red-100 p-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Something went wrong!</h2>
                <p className="max-w-[500px] text-sm text-slate-500">
                    We apologize for the inconvenience. An unexpected error has occurred.
                    {error.message && <span className="block mt-2 font-mono text-xs bg-red-50 p-2 rounded text-red-700">{error.message}</span>}
                </p>
            </div>
            <div className="flex gap-2">
                <Button onClick={() => window.location.reload()} variant="outline">
                    Reload Page
                </Button>
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="bg-[#7D3FD0] hover:bg-[#6c35b5]"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
