export const getMinimumDate = () => {
    // Get the current date
    const today = new Date();

    // Set the year to be at least 16 years in the past
    const minimumYear = today.getFullYear() - 16;
    today.setFullYear(minimumYear);

    return today;
};

export const getMaximumDate = () => {
    // Get the current date
    const today = new Date();

    // Set the year to be at least 16 years in the past
    const minimumYear = today.getFullYear() - 70;
    today.setFullYear(minimumYear);

    return today;
};

export const convertTimeStringToDateString = (value: string) =>
    new Date(
        `${new Date().toISOString().split("T")[0]}T${value}`
    ) as unknown as string;