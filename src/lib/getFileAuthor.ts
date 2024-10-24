export function getFileAuthor() {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    const { name, lastname } = userInfo
      ? JSON.parse(userInfo)
      : { name: "", lastname: "" };

    return `${name} ${lastname}`;
  }
  return "";
}
