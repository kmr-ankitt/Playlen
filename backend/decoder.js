export function parseISODurationToMinutes(duration) {
    const regex = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = duration.match(regex);
    if (!matches) {
      return null;
    }
    const days = parseInt(matches[1] || 0);
    const hours = parseInt(matches[2] || 0);
    const minutes = parseInt(matches[3] || 0);
    const seconds = parseInt(matches[4] || 0);
    const totalMinutes = days * 24 * 60 + hours * 60 + minutes + seconds / 60;
    return Math.round(totalMinutes);
  }
  