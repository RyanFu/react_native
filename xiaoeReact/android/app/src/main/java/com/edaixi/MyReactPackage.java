package com.edaixi;

import com.edaixi.modules.ChooseImageModule;
import com.edaixi.modules.ConfigModule;
import com.edaixi.modules.DeviceInfoModule;
import com.edaixi.modules.MapUtilModule;
import com.edaixi.modules.ScannerModule;
import com.edaixi.modules.UpdateUtilModule;
import com.edaixi.modules.WXShareModule;
import com.edaixi.modules.XGPushModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.edaixi.modules.PayModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 注册Module
 */
public class MyReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new PayModule(reactContext));
        modules.add(new WXShareModule(reactContext));
        modules.add(new MapUtilModule(reactContext));
        modules.add(new ChooseImageModule(reactContext));
        modules.add(new UpdateUtilModule(reactContext));
        modules.add(new ScannerModule(reactContext));
        modules.add(new ConfigModule(reactContext));
        modules.add(new XGPushModule(reactContext));
        modules.add(new DeviceInfoModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
