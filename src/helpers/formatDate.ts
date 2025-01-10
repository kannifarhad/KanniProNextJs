function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Validate the date
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateString}`);
    }

    // Format the date
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
      .format(date)
      .replace(',', '.'); // Replace the comma to match "20 Nov. 2024"
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred.');
    return 'Invalid Date'; // Fallback value
  }
}
export default formatDate;