const wrapText = (text) => {
  let tmp = text.split(" ");
  let tmp2 = tmp.map((i) => {
    if (i.length > 25) {
      let tmp1 = "";
      [...i].forEach((j) => {
        if (tmp1.substring(tmp1.lastIndexOf(" ")).length <= 20) {
          tmp1 += j;
        } else {
          tmp1 += " " + j;
        }
      });
      return tmp1 + " ";
    }
    return i + " ";
  });
  return tmp2.join("");
};

export default wrapText;
