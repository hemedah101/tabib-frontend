export const SanitizeFromSubmission = (values: any, record: any) => {
  const entries = Object.entries(values);
  const result: any = {};

  for (const entry of entries) {
    const key = entry[0];
    const value = entry[1];

    if (value !== record[key] && value !== undefined && value !== '') {
      result[key] = value;
    }
  }
  return result;
};
