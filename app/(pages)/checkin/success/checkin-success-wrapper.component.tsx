import { redirect } from "next/navigation";
import { FEATURE_FLAGS, ROUTES } from "@/lib/config/constants";
import React from "react";

export default function CheckInSuccessWrapper({ children }: { children: React.ReactNode }) {
    if (!FEATURE_FLAGS.CHECKIN_ENABLED) {
        redirect(ROUTES.HOME);
    }

    return <>{children}</>;
}
