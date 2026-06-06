export const debounce = (func, delay = 250) => {
  let timer = null;
 
  return () => {
    let context = this;
    let args = arguments;
 
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay)
  }
}

export const throttle = (func, timeout = 250) => {
  let last;
  let timer;
 
  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date();
 
    if (last && now < last + timeout) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        func.apply(context, args)
      }, timeout)
    } else {
      last = now
      func.apply(context, args)
    }
  }
}

export const resizeObserver = (callback) => {
  return new ResizeObserver(throttle(callback, 200));
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


// export const groupBy = (items, key) => items.reduce(
//   (result, item) => ({
//     ...result,
//     [item[key]]: [
//       ...(result[item[key]] || []),
//       item,
//     ],
//   }), 
//   {},
// );

// export const groupBy = (list, keyGetter) => {
//     const map = new Map();
//     list.forEach((item) => {
//          const key = keyGetter(item);
//          const collection = map.get(key);
//          if (!collection) {
//              map.set(key, [item]);
//          } else {
//              collection.push(item);
//          }
//     });
//     return map;
// }


export const groupBy = (array, item) => {
  let f = e => e[item];
  let groups = {};
  array.forEach((o) => {
    let key = f(o);
    groups[key] = groups[key] || [];
    groups[key].push(o);
  });
  return Object.keys(groups).map(key => {
    let data = {}
    data[item] = key
    data.list = groups[key]
    return data;
  })
};


export const isFormatSupported = (format, dataUri) =>
new Promise((resolve, reject) => {
  const image = new Image();
  image.src = `data:image/${format};base64,${dataUri}`;
  image.onload = () => {
    resolve(true);
  };
  image.onerror = () => {
    reject(format.toUpperCase() + "format not supported");
  };
});

// const supportsAvif = await isFormatSupported(
//   "avif",
//   "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
// );

export const downloadImage = (path, name) => {
  var a = document.createElement('a');
  a.href = path
  a.download = `${name}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
