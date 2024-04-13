async function getIpAddress() {
  let ip = await fetch("https://api64.ipify.org?format=json");
  ip = await ip.json();
  return ip.ip;
}
export default getIpAddress;
