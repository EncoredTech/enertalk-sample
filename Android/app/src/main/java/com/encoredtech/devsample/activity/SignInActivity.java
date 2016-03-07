package com.encoredtech.devsample.activity;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.listener.WebViewListener;
import com.encoredtech.devsample.service.AppUtils;
import com.encoredtech.devsample.service.Define;
import com.encoredtech.devsample.vo.AuthInfoVo;

/**
 * Created by koansang on 2016. 2. 15..
 */
public class SignInActivity extends AppCompatActivity {
    private String loginCode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signin);

        WebView wv = (WebView) findViewById(R.id.signInView);
        wv.clearCache(true);
        wv.clearHistory();
        wv.getSettings().setJavaScriptEnabled(true);
        wv.getSettings().setAllowContentAccess(true);
        wv.getSettings().setBlockNetworkLoads(false);
        wv.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        wv.getSettings().setAppCacheEnabled(false);
        wv.setWebViewClient(new WebViewListener(this, 0));

        Log.i("Create Signin", "Init Signin");

        wv.loadUrl(makeAuthURL());

    }


    private String makeAuthURL() {
        String url = "";

        AuthInfoVo auth = Define.AUTH_INFO;

        url += AppUtils.getUrlEncodeString("client_id", auth.getClient_id()) + "&";
        url += AppUtils.getUrlEncodeString("response_type", auth.getResponse_type()) + "&";
        url += AppUtils.getUrlEncodeString("redirect_uri", auth.getRedirect_uri()) + "&";
        url += AppUtils.getUrlEncodeString("app_version", auth.getApp_version()) + "&";
        url += AppUtils.getUrlEncodeString("back_url", auth.getBack_url());

        System.out.println(url);

        return Define.AUTH_DOMAIN + "/login?" + url;
    }

    public void setLoginCode(String loginCode) {
        this.loginCode = loginCode;
    }
}
