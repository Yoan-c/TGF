export function format(date) {
  /*
  const dateDiff = new Date(date).toLocaleString("fr-FR", {
    weekday: "long",
  });
  */
  const dateDiffDay = new Date().getDay() - new Date(date).getDay();
  // 0 jour
  if (dateDiffDay === 0) {
    const dateDiffHour = new Date().getHours() - new Date(date).getHours();
    // 0 heur
    if (dateDiffHour === 0) {
      const dateDiffMin = new Date().getMinutes() - new Date(date).getMinutes();
      // 0 min
      if (dateDiffMin === 0) {
        const dateDiffSec =
          new Date().getSeconds() - new Date(date).getSeconds();
        //  sec
        return `${dateDiffSec} secondes`;
      } else return `${dateDiffMin} ${dateDiffMin > 1 ? "minutes" : "minute"} `;
    } else return `${dateDiffHour} ${dateDiffHour > 1 ? "heures" : "heure"} `;
  } else
    return `${dateDiffDay * -1} ${dateDiffDay * -1 > 1 ? "jours" : "jour"} `;
}
