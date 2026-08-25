type MetricCallback = (metric: {
  id: string;
  name: string;
  value: number;
  rating?: string;
  label?: string;
}) => void;

const reportWebVitals = (onPerfEntry?: MetricCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
