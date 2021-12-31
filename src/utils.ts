export const approxNumber = (value: number): string => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 10000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  } else {
    return new Intl.NumberFormat("en-US", {}).format(value);
  }
};
