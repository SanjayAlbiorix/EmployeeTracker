const path = require("path");
const fs = require("fs");
const {
  withDangerousMod,
  withMainApplication,
} = require("@expo/config-plugins");

const MODULE_DIR_NAME = "simplegreeting";

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function kotlinModuleSource(pkg) {
  return `package ${pkg}.${MODULE_DIR_NAME}

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SimpleGreetingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "SimpleGreeting"

  @ReactMethod
  fun getGreeting(promise: Promise) {
    promise.resolve("Hello from SimpleGreeting native module!")
  }
}
`;
}

function kotlinPackageSource(pkg) {
  return `package ${pkg}.${MODULE_DIR_NAME}

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class SimpleGreetingPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
    listOf(SimpleGreetingModule(reactContext))

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> = emptyList()
}
`;
}

function getMainApplicationPackage(content) {
  const match = content.match(/package\s+([\w\.]+)/);
  return match ? match[1] : null;
}

const withSimpleGreetingSources = (config) => {
  return withDangerousMod(config, [
    "android",
    async (cfg) => {
      const projectRoot = cfg.modRequest.projectRoot;
      const appSrcMain = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main"
      );
      const mainAppPath = path.join(appSrcMain, "java");
      const mainAppKt = path.join(
        mainAppPath,
        "com",
        "app",
        "reactnative",
        "expo",
        "MainApplication.kt"
      );

      let basePackage = "com.app.reactnative.expo";
      try {
        const content = fs.readFileSync(mainAppKt, "utf8");
        const pkg = getMainApplicationPackage(content);
        if (pkg) basePackage = pkg;
      } catch {}

      const pkgPath = path.join(mainAppPath, ...basePackage.split("."));
      const moduleDir = path.join(pkgPath, MODULE_DIR_NAME);
      ensureDirSync(moduleDir);

      const moduleFile = path.join(moduleDir, "SimpleGreetingModule.kt");
      const packageFile = path.join(moduleDir, "SimpleGreetingPackage.kt");

      if (!fs.existsSync(moduleFile)) {
        fs.writeFileSync(moduleFile, kotlinModuleSource(basePackage));
      }
      if (!fs.existsSync(packageFile)) {
        fs.writeFileSync(packageFile, kotlinPackageSource(basePackage));
      }

      return cfg;
    },
  ]);
};

const withSimpleGreetingPackage = (config) => {
  return withMainApplication(config, (config) => {
    let src = config.modResults.contents;

    if (!src.includes("SimpleGreetingPackage")) {
      const importLine = `\nimport ${"${"}PACKAGE_PLACEHOLDER${"}"}.${MODULE_DIR_NAME}.SimpleGreetingPackage`;
      const pkg = getMainApplicationPackage(src);
      const resolvedImport = importLine.replace(
        "${PACKAGE_PLACEHOLDER}",
        pkg ?? "com.app.reactnative.expo"
      );
      src = src.replace(
        /(import\s+expo\.modules\.ReactNativeHostWrapper)/,
        `${"$"}1${resolvedImport}`
      );

      src = src.replace(
        /(PackageList\(this\)\.packages\.apply\s*\{[\s\S]*?)(\n\s*\})/,
        (m, p1, p2) => `${p1}\n              add(SimpleGreetingPackage())${p2}`
      );

      config.modResults.contents = src;
    }
    return config;
  });
};

const withSimpleGreeting = (config) => {
  config = withSimpleGreetingSources(config);
  config = withSimpleGreetingPackage(config);
  return config;
};

module.exports = withSimpleGreeting;
