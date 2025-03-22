/**
 * Logging utility that controls console output based on environment
 * and provides structured error reporting
 */

// Configuration
const config = {
  // Set to false to completely disable debug logs, even in development
  enableDebugLogs: false,
  
  // Set to false to disable info logs
  enableInfoLogs: true,
  
  // Component debugging - set specific components to false to disable their logs
  components: {
    PeriodProgress: false,
    Schedule: false,
    PrivateRoute: false,
    ErrorBoundary: false,
    Account: true, // Keep Account logs as they're less frequent
    // Add other components as needed
  }
};

// Only show logs in development unless forced
// Update to use Vite's environment variables instead of process.env
const isDev = import.meta.env.MODE !== 'production';

// Create a Set for faster lookup of sensitive fields
const SENSITIVE_FIELDS = new Set(['accessToken', 'password', 'token', 'profilePicture']);

// Sanitize sensitive data from objects (recursive)
const sanitizeData = (data) => {
  if (!data) return data;
  
  if (typeof data === 'object') {
    // Create a new object to avoid mutating the original
    const sanitized = Array.isArray(data) ? [...data] : {...data};
    
    // Recursively sanitize each property
    for (const key in sanitized) {
      // Sensitive fields to mask (using Set for faster lookup)
      if (SENSITIVE_FIELDS.has(key)) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = sanitizeData(sanitized[key]);
      }
    }
    return sanitized;
  }
  
  return data;
};

// Create component prefix map for faster lookup
const COMPONENT_PREFIXES = {};
Object.keys(config.components).forEach(component => {
  COMPONENT_PREFIXES[`${component} -`] = component;
});

// Helper to check if component logging is enabled - optimized version
const isComponentLoggingEnabled = (message) => {
  if (!message || typeof message !== 'string') return true;
  
  // More efficient component check
  for (const prefix in COMPONENT_PREFIXES) {
    if (message.startsWith(prefix)) {
      const component = COMPONENT_PREFIXES[prefix];
      return config.components[component];
    }
  }
  
  return true; // If component not specified in config, allow logging
};

// Main logger object
const logger = {
  // Standard logging levels
  debug: (...args) => {
    if (isDev && config.enableDebugLogs && isComponentLoggingEnabled(args[0])) {
      console.debug(...args.map(arg => 
        typeof arg === 'object' ? sanitizeData(arg) : arg
      ));
    }
  },
  
  log: (...args) => {
    if (isDev && isComponentLoggingEnabled(args[0])) {
      console.log(...args.map(arg => 
        typeof arg === 'object' ? sanitizeData(arg) : arg
      ));
    }
  },
  
  info: (...args) => {
    if (isDev && config.enableInfoLogs && isComponentLoggingEnabled(args[0])) {
      console.info(...args.map(arg => 
        typeof arg === 'object' ? sanitizeData(arg) : arg
      ));
    }
  },
  
  warn: (...args) => {
    console.warn(...args.map(arg => 
      typeof arg === 'object' ? sanitizeData(arg) : arg
    ));
  },
  
  error: (error, context = {}) => {
    const errorInfo = {
      message: error?.message || String(error),
      stack: error?.stack,
      context: sanitizeData(context),
      timestamp: new Date().toISOString()
    };
    
    // Log to console
    console.error('Error:', errorInfo.message);
    
    if (isDev) {
      console.error('Details:', errorInfo);
    } else {
      // In production, you could send this to a monitoring service
      // e.g., Sentry, LogRocket, etc.
      
      // TODO: Implement production error reporting
      // sendToErrorMonitoring(errorInfo);
    }
    
    return errorInfo;
  }
};

export default logger;
