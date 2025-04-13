if (typeof window !== "undefined") {
  // Polyfill window.global
  if (!window.global) {
    window.global = window
  }

  // Polyfill process
  if (!window.process) {
    window.process = {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        ...process.env,
      },
      nextTick: (cb: () => void) => Promise.resolve().then(cb),
      version: "",
      browser: true,
      __Process$: "test", // Add this specific polyfill
    }
  }

  // Ensure all required process properties exist
  if (!window.process.__Process$) {
    window.process.__Process$ = "test"
  }

  // Additional required globals
  if (!window.Buffer) {
    window.Buffer = {
      isBuffer: () => false,
    }
  }
}

export {}

