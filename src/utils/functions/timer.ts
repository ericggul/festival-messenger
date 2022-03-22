export function debounce(func: any, timeout = 100) {
  let timer: any;

  return (...args: any) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => func(...args), timeout);
  };
}

export function throttle(func: any, timeout = 100) {
  let waiting = false;
  return (...args: any) => {
    if (!waiting) {
      func(...args);
      waiting = true;
      window.setTimeout(() => (waiting = false), timeout);
    }
  };
}
