import { PermissionResponse } from "expo-modules-core";

export type PermissionModule = {
  getPermissionMethod: () => Promise<PermissionResponse>;
  requestPermissionMethod: () => Promise<PermissionResponse>;
};

export const RESULTS = {
  GRANTED: "granted",
  DENIED: "denied",
  UNDETERMINED: "undetermined",
} as const;

export const handlePermission = async (
  registry: PermissionModule
): Promise<boolean> => {
  if (!registry) return false;

  let { status } = await registry.getPermissionMethod();

  if (status === RESULTS.UNDETERMINED || status === RESULTS.DENIED) {
    const res = await registry.requestPermissionMethod();
    status = res.status;
  }

  return status === RESULTS.GRANTED;
};

export const handleMultiplePermissions = async (
  registries: PermissionModule[]
): Promise<Record<string, boolean>> => {
  const results: Record<string, boolean> = {};

  for (const registry of registries) {
    const key =
      registry.getPermissionMethod.name
        .replace("get", "")
        .replace("Async", "") || "unknown";

    const granted = await handlePermission(registry);
    results[key] = granted;
  }

  return results;
};
