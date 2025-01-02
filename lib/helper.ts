export function truncateDescription (description: string, maxLength: number){
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

export function getMonthName(monthNumber: number) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber - 1]; // Adjust for zero-based indexing
  }