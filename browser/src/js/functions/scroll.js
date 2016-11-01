"use strict";


export function init() {
  if(window.addEventListener) {
    addEventListener("scroll", onScroll, false);
  } else {
    attachEvent("onscroll", onScroll);
  }

  var css = document.createElement("div");

  css.innerHTML = ".<style>" + 
    "[data-x-sticky] {margin:0}" +
    "[data-x-sticky-placeholder] {padding:0; margin:0; border:0}" +
    "[data-x-sticky-placeholder] > [data-x-sticky] {position:relative; margin:0!important}" +
    "[data-x-sticky-placeholder] > [data-x-sticky-active] {position:fixed}<\/style>";

  var s = document.querySelector("script");
  s.parentNode.insertBefore(css.childNodes[1], s);
}

function onScroll() {
  var list = document.querySelectorAll("[data-x-sticky]");
  // console.log('Scroll: ', list)

  for (var i = 0, item; item = list[i]; i++) {
    var bound = getBoundary(item);
    var edge = bound.getBoundingClientRect().bottom;
    var nextItem = findNextInBoundary(list, i, bound);

    if (nextItem) {
      if (nextItem.parentNode.hasAttribute("data-x-sticky-placeholder")) {
        nextItem = nextItem.parentNode;
      }

      edge = nextItem.getBoundingClientRect().top;
    }

    var hasHolder = item.parentNode.hasAttribute("data-x-sticky-placeholder");
    var rect = item.getBoundingClientRect();
    var height = rect.bottom - rect.top;
    var width = rect.right - rect.left;
    var top = hasHolder ? item.parentNode.getBoundingClientRect().top : rect.top;

    if (top < 0) {
      if (edge > height) {
        if (!item.hasAttribute("data-x-sticky-active")) {
          item.setAttribute("data-x-sticky-active", "");
        }

        item.style.top = "0px";
      } else {
        if (item.hasAttribute("data-x-sticky-active")) {
          item.removeAttribute("data-x-sticky-active");
        }

        item.style.top = -((top - edge) + height) + "px";
      }

      if (!hasHolder) {
        var d = document.createElement("div");

        d.setAttribute("data-x-sticky-placeholder", "");
        d.style.height = height + "px";
        d.style.width = width + "px";
        copyLayoutStyles(d, item);
        item.parentNode.insertBefore(d, item);
        d.appendChild(item);
      }
    } else {
      if (item.hasAttribute("data-x-sticky-active")) {
        item.removeAttribute("data-x-sticky-active");
      }

      item.style.top = "auto";

      if(hasHolder) {
        item = item.parentNode;
        item.parentNode.insertBefore(item.firstChild, item);
        item.parentNode.removeChild(item);
      }
    }
  }
}

function findNextInBoundary(arr, i, boundary) {
  i++;

  for (var item; item = arr[i]; i++) {
    if (getBoundary(item) == boundary) {
      return item;
    }
  }
}

function getBoundary(n) {
  while (n = n.parentNode) {
    if (n.hasAttribute("data-x-sticky-boundary")) {
      return n;
    }
  }

  return document.body || document.documentElement;
}

function copyLayoutStyles(to, from) {
  var props = {
    marginTop: 1,
    marginRight: 1,
    marginBottom: 1,
    marginLeft: 1
  };

  if (from.currentStyle) {
    props.styleFloat = 1;

    for (var s in props) {
      to.style[s] = from.currentStyle[s];
    }
  } else {
    props.cssFloat = 1;

    for (var s in props) {
      to.style[s] = getComputedStyle(from, null)[s];
    }
  }
}
// })(documentument);



// "use strict";


// export function init() {
//   if(window.addEventListener) {
//     addEventListener("scroll", onScroll, false);
//   } else {
//     attachEvent("onscroll", onScroll);
//   }

//   var css = document.createElement("div");

//   css.innerHTML = ".<style>" + 
//     "[data-x_sticky] {margin:0}" +
//     "[data-x_sticky_placeholder] {padding:0; margin:0; border:0}" +
//     "[data-x_sticky_placeholder] > [data-x_sticky] {position:relative; margin:0!important}" +
//     "[data-x_sticky_placeholder] > [data-x_sticky_active] {position:fixed}<\/style>";

//   var s = document.querySelector("script");
//   s.parentNode.insertBefore(css.childNodes[1], s);
// }

// function onScroll() {
//   var list = document.querySelectorAll("[data-x_sticky]");

//   for (var i = 0, item; item = list[i]; i++) {
//     var bound = getBoundary(item);
//     var edge = bound.getBoundingClientRect().bottom;
//     var nextItem = findNextInBoundary(list, i, bound);

//     if (nextItem) {
//       if (nextItem.parentNode.hasAttribute("data-x_sticky_placeholder")) {
//         nextItem = nextItem.parentNode;
//       }

//       edge = nextItem.getBoundingClientRect().top;
//     }

//     var hasHolder = item.parentNode.hasAttribute("data-x_sticky_placeholder");
//     var rect = item.getBoundingClientRect();
//     var height = rect.bottom - rect.top;
//     var width = rect.right - rect.left;
//     var top = hasHolder ? item.parentNode.getBoundingClientRect().top : rect.top;

//     if (top < 0) {
//       if (edge > height) {
//         if (!item.hasAttribute("data-x_sticky_active")) {
//           item.setAttribute("data-x_sticky_active", "");
//         }

//         item.style.top = "0px";
//       } else {
//         if (item.hasAttribute("data-x_sticky_active")) {
//           item.removeAttribute("data-x_sticky_active");
//         }

//         item.style.top = -((top - edge) + height) + "px";
//       }

//       if (!hasHolder) {
//         var d = document.createElement("div");

//         d.setAttribute("data-x_sticky_placeholder", "");
//         d.style.height = height + "px";
//         d.style.width = width + "px";
//         copyLayoutStyles(d, item);
//         item.parentNode.insertBefore(d, item);
//         d.appendChild(item);
//       }
//     } else {
//       if (item.hasAttribute("data-x_sticky_active")) {
//         item.removeAttribute("data-x_sticky_active");
//       }

//       item.style.top = "auto";

//       if(hasHolder) {
//         item = item.parentNode;
//         item.parentNode.insertBefore(item.firstChild, item);
//         item.parentNode.removeChild(item);
//       }
//     }
//   }
// }

// function findNextInBoundary(arr, i, boundary) {
//   i++;

//   for (var item; item = arr[i]; i++) {
//     if (getBoundary(item) == boundary) {
//       return item;
//     }
//   }
// }

// function getBoundary(n) {
//   while (n = n.parentNode) {
//     if (n.hasAttribute("data-x_sticky_boundary")) {
//       return n;
//     }
//   }

//   return document.body || document.documentElement;
// }

// function copyLayoutStyles(to, from) {
//   var props = {
//     marginTop: 1,
//     marginRight: 1,
//     marginBottom: 1,
//     marginLeft: 1
//   };

//   if (from.currentStyle) {
//     props.styleFloat = 1;

//     for (var s in props) {
//       to.style[s] = from.currentStyle[s];
//     }
//   } else {
//     props.cssFloat = 1;

//     for (var s in props) {
//       to.style[s] = getComputedStyle(from, null)[s];
//     }
//   }
// }
// // })(document);
