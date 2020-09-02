export const precise = (value, precise_value) => {
  let precise = precise_value.toString();
  let x = parseFloat(value);
  if (precise === "0") {
    // if (Math.abs(x) < 1.0) {
    //   var e = parseInt(x.toString().split("e-")[1]);
    //   if (e) {
    //     x *= Math.pow(10, e - 1);
    //     x = "0." + new Array(e).join("0") + x.toString().substring(2);
    //   }
    // } else {
    //   var e = parseInt(x.toString().split("+")[1]);
    //   if (e > 20) {
    //     e -= 20;
    //     x /= Math.pow(10, e);
    //     x += new Array(e + 1).join("0");
    //   }
    // }
    // if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 0) {
    //   {
    x = x.toFixed(0);
    //     if (
    //       x.toString()[x.toString().length - 1] == "0" &&
    //       (x.toString().split(".")[1][0] != "0" ||
    //         x.toString().split(".")[1][5] != "0")
    //     ) {
    //       return parseFloat(x);
    //     } else if (x.toString().split(".")[1][0] == "0") {
    //       return parseFloat(x).toFixed(0);
    //     }
    //   }
    // }
    return x;
  }
  if (precise === "1") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 1) {
      {
        x = parseFloat(x).toFixed(1);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][1] == "0") {
          if (x.toString().split(".")[1][0] == "0") {
            return parseFloat(x).toFixed(0);
          } else return parseFloat(x).toFixed(1);
        }
      }
    }
    return x;
  }
  if (precise === "2") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 2) {
      {
        x = parseFloat(x).toFixed(2);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][1] == "0") {
          if (x.toString().split(".")[1][0] == "0") {
            return parseFloat(x).toFixed(0);
          } else return parseFloat(x).toFixed(1);
        }
      }
    }
    return x;
  }
  if (precise === "3") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 3) {
      {
        x = parseFloat(x).toFixed(3);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][2] == "0") {
          if (x.toString().split(".")[1][1] == "0") {
            if (x.toString().split(".")[1][0] == "0") {
              return parseFloat(x).toFixed(0);
            } else return parseFloat(x).toFixed(1);
          } else return parseFloat(x).toFixed(2);
        } else return parseFloat(x).toFixed(3);
      }
    }
    return x;
  }
  if (precise === "4") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 4) {
      {
        x = parseFloat(x).toFixed(4);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][3] == "0") {
          if (x.toString().split(".")[1][2] == "0") {
            if (x.toString().split(".")[1][1] == "0") {
              if (x.toString().split(".")[1][0] == "0") {
                return parseFloat(x).toFixed(0);
              } else return parseFloat(x).toFixed(1);
            } else return parseFloat(x).toFixed(2);
          } else return parseFloat(x).toFixed(3);
        } else return parseFloat(x).toFixed(4);
      }
    }
    return x;
  }
  if (precise === "5") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 5) {
      {
        x = parseFloat(x).toFixed(4);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][4] == "0") {
          if (x.toString().split(".")[1][3] == "0") {
            if (x.toString().split(".")[1][2] == "0") {
              if (x.toString().split(".")[1][1] == "0") {
                if (x.toString().split(".")[1][0] == "0") {
                  return parseFloat(x).toFixed(0);
                } else return parseFloat(x).toFixed(1);
              } else return parseFloat(x).toFixed(2);
            } else return parseFloat(x).toFixed(3);
          } else return parseFloat(x).toFixed(4);
        } else return parseFloat(x).toFixed(5);
      }
    }
    return x;
  }
  if (precise === "6") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 6) {
      {
        x = parseFloat(x).toFixed(6);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][5] == "0") {
          if (x.toString().split(".")[1][4] == "0") {
            if (x.toString().split(".")[1][3] == "0") {
              if (x.toString().split(".")[1][2] == "0") {
                if (x.toString().split(".")[1][1] == "0") {
                  if (x.toString().split(".")[1][0] == "0") {
                    return parseFloat(x).toFixed(0);
                  } else return parseFloat(x).toFixed(1);
                } else return parseFloat(x).toFixed(2);
              } else return parseFloat(x).toFixed(3);
            } else return parseFloat(x).toFixed(4);
          } else return parseFloat(x).toFixed(5);
        } else return parseFloat(x).toFixed(6);
      }
    }
    return x;
  }
  if (precise === "7") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 8) {
      {
        x = parseFloat(x).toFixed(8);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][6] == "0") {
          if (x.toString().split(".")[1][5] == "0") {
            if (x.toString().split(".")[1][4] == "0") {
              if (x.toString().split(".")[1][3] == "0") {
                if (x.toString().split(".")[1][2] == "0") {
                  if (x.toString().split(".")[1][1] == "0") {
                    if (x.toString().split(".")[1][0] == "0") {
                      return parseFloat(x).toFixed(0);
                    } else return parseFloat(x).toFixed(1);
                  } else return parseFloat(x).toFixed(2);
                } else return parseFloat(x).toFixed(3);
              } else return parseFloat(x).toFixed(4);
            } else return parseFloat(x).toFixed(5);
          } else return parseFloat(x).toFixed(6);
        } else return parseFloat(x).toFixed(7);
      }
    }
    return x;
  }
  if (precise === "8") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 8) {
      {
        x = parseFloat(x).toFixed(8);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][7] == "0") {
          if (x.toString().split(".")[1][6] == "0") {
            if (x.toString().split(".")[1][5] == "0") {
              if (x.toString().split(".")[1][4] == "0") {
                if (x.toString().split(".")[1][3] == "0") {
                  if (x.toString().split(".")[1][2] == "0") {
                    if (x.toString().split(".")[1][1] == "0") {
                      if (x.toString().split(".")[1][0] == "0") {
                        return parseFloat(x).toFixed(0);
                      } else return parseFloat(x).toFixed(1);
                    } else return parseFloat(x).toFixed(2);
                  } else return parseFloat(x).toFixed(3);
                } else return parseFloat(x).toFixed(4);
              } else return parseFloat(x).toFixed(5);
            } else return parseFloat(x).toFixed(6);
          } else return parseFloat(x).toFixed(7);
        } else return parseFloat(x).toFixed(8);
      }
    }
    return x;
  }
  if (precise === "9") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 9) {
      {
        x = parseFloat(x).toFixed(9);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][8] == "0") {
          if (x.toString().split(".")[1][7] == "0") {
            if (x.toString().split(".")[1][6] == "0") {
              if (x.toString().split(".")[1][5] == "0") {
                if (x.toString().split(".")[1][4] == "0") {
                  if (x.toString().split(".")[1][3] == "0") {
                    if (x.toString().split(".")[1][2] == "0") {
                      if (x.toString().split(".")[1][1] == "0") {
                        if (x.toString().split(".")[1][0] == "0") {
                          return parseFloat(x).toFixed(0);
                        } else return parseFloat(x).toFixed(1);
                      } else return parseFloat(x).toFixed(2);
                    } else return parseFloat(x).toFixed(3);
                  } else return parseFloat(x).toFixed(4);
                } else return parseFloat(x).toFixed(5);
              } else return parseFloat(x).toFixed(6);
            } else return parseFloat(x).toFixed(7);
          } else return parseFloat(x).toFixed(8);
        } else return parseFloat(x).toFixed(9);
      }
    }
    return x;
  }
  if (precise === "10") {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    if (x.toString().split(".")[1] && x.toString().split(".")[1].length > 10) {
      {
        x = parseFloat(x).toFixed(10);
        if (
          x.toString()[x.toString().length - 1] == "0" &&
          (x.toString().split(".")[1][0] != "0" ||
            x.toString().split(".")[1][5] != "0")
        ) {
          return parseFloat(x);
        } else if (x.toString().split(".")[1][9] == "0") {
          if (x.toString().split(".")[1][8] == "0") {
            if (x.toString().split(".")[1][7] == "0") {
              if (x.toString().split(".")[1][6] == "0") {
                if (x.toString().split(".")[1][5] == "0") {
                  if (x.toString().split(".")[1][4] == "0") {
                    if (x.toString().split(".")[1][3] == "0") {
                      if (x.toString().split(".")[1][2] == "0") {
                        if (x.toString().split(".")[1][1] == "0") {
                          if (x.toString().split(".")[1][0] == "0") {
                            return parseFloat(x).toFixed(0);
                          } else return parseFloat(x).toFixed(1);
                        } else return parseFloat(x).toFixed(2);
                      } else return parseFloat(x).toFixed(3);
                    } else return parseFloat(x).toFixed(4);
                  } else return parseFloat(x).toFixed(5);
                } else return parseFloat(x).toFixed(6);
              } else return parseFloat(x).toFixed(7);
            } else return parseFloat(x).toFixed(8);
          } else return parseFloat(x).toFixed(9);
        } else return parseFloat(x).toFixed(10);
      }
    }
    return x;
  }
};
