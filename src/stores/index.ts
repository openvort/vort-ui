import { reactive } from "vue";

interface Config {
  primaryColor?: string;
}

const config = reactive<Config>({
  primaryColor: "blue",
});

export function useConfigStore() {
  const setConfig = (newConfig: Partial<Config>) => {
    Object.assign(config, newConfig);
  };

  return {
    config,
    setConfig,
  };
}
