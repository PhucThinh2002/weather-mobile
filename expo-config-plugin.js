export default (config) => {
    return {
      ...config,
      extra: {
        ...config.extra,
        newArchEnabled: true,
      },
    };
  };