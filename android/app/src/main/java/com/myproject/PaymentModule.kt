package com.myproject // replace your-apps-package-name with your app’s package name


import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.initialcode.paymentsdk.PaymentSDK
import com.initialcode.paymentsdk.PaymentSDKResponseCallback



class PaymentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName() = "PaymentModule"


    @ReactMethod
    fun createCalendarEvent(name: String, location: String) {
        Log.d("PaymentModule", "Create event called with name: $name and location: $location")
    }
    @ReactMethod
    fun showToast(message: String) {
        Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun startPayment(cardNo: String, expDate: String, cvv: String, amount: Double, successCallback: Callback, errorCallback: Callback) {
        PaymentSDK().startPayment(cardNo, expDate, cvv, amount, object : PaymentSDKResponseCallback {
            override fun onSuccess() {
                successCallback.invoke("Payment Successful")
            }

            override fun onFailure(message: String) {
                errorCallback.invoke(message)
            }
        })
    }

    @ReactMethod
    fun confirmPayment(otp: String, successCallback: Callback, errorCallback: Callback) {
        PaymentSDK().confirmPayment(otp, object : PaymentSDKResponseCallback {
            override fun onSuccess() {
                successCallback.invoke("Confirmation Successful")
            }

            override fun onFailure(message: String) {
                errorCallback.invoke(message)
            }
        })
    }


}