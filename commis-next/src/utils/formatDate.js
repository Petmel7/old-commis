
export const formatDate = (date, locale = "uk-UA") => {
    if (!date) return "Невідомо";
    try {
        return new Date(date).toLocaleDateString(locale);
    } catch (error) {
        console.error("Invalid date provided:", date);
        return "Невідомо";
    }
};
