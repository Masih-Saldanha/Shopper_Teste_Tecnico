function formatDistance(distance: number): string {
  return distance.toFixed(3).replace('.', ',') + ' Km';
}

function formatValue(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

function formatDuration(duration: string): string {
  const seconds = parseInt(duration.replace('s', ''));
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("pt-BR");
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} - ${formattedTime} h`;
}

const formatUtils = {
  formatDistance,
  formatValue,
  formatDuration,
  formatDate
}

export default formatUtils;