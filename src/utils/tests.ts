/**
 * Validate a cron expression.
 * @param expression The cron expression to validate.
 * @returns Whether the cron expression is valid.
 */
export const testCronExpression = (expression: string): boolean => {
  const cronExpressionRegex =
    /^(\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2})$/;
  return cronExpressionRegex.test(expression);
};

/**
 * Validate a time.
 * @param time The time to validate.
 * @returns Whether the time is valid.
 */
export const validateTime = (time: string): boolean => {
  const timeRegex = /^(?:[01]\d|2[0-3]):(?:00|30)$/; // Regular expression to validate HH:MM format
  return timeRegex.test(time);
};

/**
 * Tests if a string is empty.
 * @param str The string to test.
 * @returns True if the string is empty, false otherwise.
 */
export const testEmail = (str: string): boolean => {
  // /^\S+@\S+\.\S+$/
  // /\S+@\S+\.\S+/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

/**
 * Tests if a username is valid.
 * @param str The username to test.
 * @returns True if the username is valid, false otherwise.
 */
export const testUsername = (str: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(str);
};

/**
 * Tests if a password is valid.
 * @param str The password to test.
 * @returns True if the password is valid, false otherwise.
 */
export const testPassword = (str: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(str);
};

/**
 * Tests if a phone number is valid.
 * @param str The phone number to test.
 * @returns True if the phone number is valid, false otherwise.
 */
export const testPhoneNumber = (str: string): boolean => {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(str);
};

/**
 * Tests if a ipv4 address is valid.
 * @param str The IPv4 address to test.
 * @returns True if the IPv4 address is valid, false otherwise.
 */
export const testIpv4Address = (str: string): boolean => {
  // ^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$ - https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
  const ipv4AddressRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
  return ipv4AddressRegex.test(str);
};

/**
 * Tests if a color is valid.
 * @param color The color string to test.
 * @returns True if the color is valid, false otherwise.
 */
export const testColor = (color: string): boolean => {
  // Remove any whitespace from the input
  const cleanedColor = color.replace(/\s/g, '');

  // Check if the input matches a valid hex color pattern
  if (/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleanedColor)) {
    // If it does, add a '#' if it's missing and return the cleanedColor
    return cleanedColor.startsWith('#');
  }

  return false;
};

/**
 * Tests if a url is valid.
 * @param url The url to test.
 * @returns True if the url is valid, false otherwise.
 */
export const testUrl = (url: string): boolean => {
  // Check if the url is valid
  try {
    const urlObject = new URL(url);
    return urlObject.href === url; // Additional check to handle relative URLs
  } catch (err) {
    return false;
  }
};

/**
 * Tests if a path is valid.
 * @param path The path to test.
 * @returns True if the path is valid, false otherwise.
 */
export const testPath = (path: string): boolean => {
  const pathRegex = /^\/(?:[a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]*$/;
  return pathRegex.test(path);
};

/**
 * Tests if an image is valid.
 * @param image The image to test.
 * @returns True if the image is valid, false otherwise.
 */
export const testImage = (image: string): boolean => {
  // Check if the image is valid
  try {
    const imageObject = new URL(image);
    return imageObject.href === image; // Additional check to handle relative URLs
  } catch (err) {
    return false;
  }
};
