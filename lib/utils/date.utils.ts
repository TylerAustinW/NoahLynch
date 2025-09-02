import type { DateFormatOptions } from "@/lib/types";

export function formatDate(dateString: string, options: DateFormatOptions = {}): string {
    const { includeYear = true, format = "long" } = options;

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const formatOptions: Intl.DateTimeFormatOptions = {
        month: format,
        day: "numeric",
    };

    if (includeYear) {
        formatOptions.year = "numeric";
    }

    return date.toLocaleDateString("en-US", formatOptions);
}
