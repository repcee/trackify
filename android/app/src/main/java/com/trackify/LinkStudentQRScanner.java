package com.trackify;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LinkStudentQRScanner extends ReactContextBaseJavaModule implements ActivityEventListener {

    private Promise callbackPromise;

    public LinkStudentQRScanner(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "LinkStudentQRScanner";
    }

    @ReactMethod
    public void scanQRCode(Promise promise) {
        ReactApplicationContext context = getReactApplicationContext();

        callbackPromise = promise;

        IntentIntegrator integrator = new IntentIntegrator(context.getCurrentActivity());
        integrator.initiateScan(IntentIntegrator.ALL_CODE_TYPES);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        IntentResult scanResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);

        if (scanResult != null && scanResult.getFormatName().equals("QR_CODE")) {
            callbackPromise.resolve(scanResult.getContents());
        } else {
            callbackPromise.reject(""+resultCode,
                    "rescode:"+resultCode+"requestcode:"+requestCode);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
