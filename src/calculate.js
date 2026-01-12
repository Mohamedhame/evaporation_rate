export const calculateData = (data) => {
  const ta = Number(data.temperature);
  const tc = Number(data.concreteTemperature);
  const r = Number(data.humidity);
  const v = Number(data.windSpeed);
  const results =
    5 *
    (Math.pow(tc + 18, 2.5) - (r / 100) * Math.pow(ta + 18, 2.5)) *
    (v + 4) *
    Math.pow(10, -6);

  if (results > 1) {
    return {
      isResult: true,
      isSuccess: false,
      value: results.toFixed(2),
    };
  } else {
    return {
      isResult: true,
      isSuccess: true,
      value: results.toFixed(2),
    };
  }
};
