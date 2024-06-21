/**
 * render template with arguments
 * @param tpl template string
 * @param args parameters
 * @returns string
 */
const render = (tpl: string, args: { [x: string]: any }) =>
  tpl.replace(/{{(\w+)}}/g, (t, v) => args[v] || t);

/** interpolate template with arguments
 * @param template template string
 * @param params parameters
 * @param singleSpace single space option
 * @param trim trim option
 * @returns string
 * */
export const interpolate = (
  template: string,
  params: { [key: string]: string | number },
  options?: { singleSpace?: boolean; trim?: boolean }
): string => {
  options = { singleSpace: false, trim: true, ...options };
  let output = render(template, params);

  if (options?.singleSpace) {
    output = output.replace(/\s+/g, ' ');
  }

  if (options?.trim) {
    output = output.trim();
  }

  return output;
};
