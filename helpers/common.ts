import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Converts a percentage value to a width value based on the device's width.
 * @param percentage - The percentage of the device's width.
 * @returns The calculated width in pixels.
 */
export const wp = (percentage: number): number => {
  return (percentage * deviceWidth) / 100;
};

/**
 * Converts a percentage value to a height value based on the device's height.
 * @param percentage - The percentage of the device's height.
 * @returns The calculated height in pixels.
 */
export const hp = (percentage: number): number => {
  return (percentage * deviceHeight) / 100;
};

/**
 * Removes HTML tags from a string.
 * @param html - The string containing HTML tags.
 * @returns The string with HTML tags removed.
 */
export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>?/gm, "");
};
