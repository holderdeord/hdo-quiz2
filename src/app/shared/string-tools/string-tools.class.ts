export class StringTools {
  public static interpolate(template: string, params): string {
    const keys = Object.keys(params);
    const values = Object.values(params);
    return new Function(...keys, `return \`${template}\`;`)(...values);
  }
}