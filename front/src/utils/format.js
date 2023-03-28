export function format(date) {
  /*
  const dateDiff = new Date(date).toLocaleString("fr-FR", {
    weekday: "long",
  });
  */
  const today = new Date();
  const dataCompare = new Date(date);
  const dateDiffYear = today.getFullYear() - dataCompare.getFullYear();

  if (dateDiffYear > 0)
    return `${dateDiffYear} ${dateDiffYear > 1 ? "années" : "année"} `;

  const dateDiffMonth = today.getMonth() - dataCompare.getMonth();
  if (dateDiffMonth > 0) return `${dateDiffMonth} mois`;

  const dateDiffDay = today.getDate() - dataCompare.getDate();
  // 0 jour
  if (dateDiffDay > 0)
    return `${dateDiffDay} ${dateDiffDay > 1 ? "jours" : "jour"} `;

  const dateDiffHour = today.getHours() - dataCompare.getHours();
  // 0 heure
  if (dateDiffHour > 0)
    return `${dateDiffHour} ${dateDiffHour > 1 ? "heures" : "heure"} `;

  const dateDiffMin = today.getMinutes() - dataCompare.getMinutes();
  if (dateDiffMin > 0)
    return `${dateDiffMin} ${dateDiffMin > 1 ? "minutes" : "minute"} `;

  const dateDiffSec = today.getSeconds() - dataCompare.getSeconds();
  //  sec
  return `${dateDiffSec} secondes`;
}

export function formatLocal(date) {
  const dateUser = new Date(date);
  let dateFormat = `${dateUser.getDate()}/${dateUser.getMonth()}/${dateUser.getFullYear()}`;
  return dateFormat;
}
