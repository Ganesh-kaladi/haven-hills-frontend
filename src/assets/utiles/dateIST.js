export function ISTdate(date) {
  const UTC = new Date(date);
  const IST = UTC.toLocaleString("en-IN", {
    // timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return IST;
}

export function UTCtime(date) {
  const istDate = new Date(date);
  const utcDate = new Date(istDate.toUTCString());
  // console.log(utcDate.toISOString());

  return utcDate.toISOString();
}
