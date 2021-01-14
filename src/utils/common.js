export const createRequestAction = (action) => {
  return {
    REQUEST: `${action}_request`,
    SUCCESS: `${action}_success`,
    FAIL: `${action}_fail`,
  };
};
