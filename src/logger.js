module.exports = (module) => ({
  log: (message) => console.log(`[log] [${module}] ${message}`),
  error: (message) => console.error(`[error] [${module}] ${message}`),
});