export function format(date, lang = "FR") {
  /*
  const dateDiff = new Date(date).toLocaleString("fr-FR", {
    weekday: "long",
  });
  */

  let year = "year";
  let month = "month";
  let day = "day";
  let hour = "hour";
  let minutes = "minute";
  let seconds = "second";
  if (lang === "FR") {
    year = "année";
    month = "mois";
    day = "jour";
    hour = "heure";
    minutes = "minute";
    seconds = "seconde";
  }

  const today = new Date();
  const dataCompare = new Date(date);
  const dateDiffYear = today.getFullYear() - dataCompare.getFullYear();

  if (dateDiffYear > 0)
    return `${dateDiffYear} ${dateDiffYear > 1 ? `${year}s` : year} `;

  const dateDiffMonth = today.getMonth() - dataCompare.getMonth();
  if (dateDiffMonth > 0) return `${dateDiffMonth} ${month}`;

  const dateDiffDay = today.getDate() - dataCompare.getDate();
  // 0 jour
  if (dateDiffDay > 0)
    return `${dateDiffDay} ${dateDiffDay > 1 ? `${day}s` : `${day}`} `;

  const dateDiffHour = today.getHours() - dataCompare.getHours();
  // 0 heure
  if (dateDiffHour > 0)
    return `${dateDiffHour} ${dateDiffHour > 1 ? `${hour}s` : hour} `;

  const dateDiffMin = today.getMinutes() - dataCompare.getMinutes();
  if (dateDiffMin > 0)
    return `${dateDiffMin} ${dateDiffMin > 1 ? minutes : minutes} `;

  const dateDiffSec = today.getSeconds() - dataCompare.getSeconds();
  //  sec
  return `${dateDiffSec} ${seconds}`;
}

export function formatLocal(date) {
  const dateUser = new Date(date);
  let dateFormat = `${dateUser.getDate()}/${dateUser.getMonth()}/${dateUser.getFullYear()}`;
  return dateFormat;
}
