export const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
