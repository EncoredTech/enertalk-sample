package com.encoredtech.devsample.listener;

import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.encoredtech.devsample.service.Define;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by koansang on 2016. 2. 26..
 */
public class DetailWebViewListener extends WebViewClient {
    private String cardId = null;

    public DetailWebViewListener(String cardId) {
        this.cardId = cardId;
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        Log.i("Detail Web", "Load End");
        JSONObject obj = new JSONObject();
        try {
            obj.put("id", cardId);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String jsonStr = obj.toString();
        Log.i("JSON Str", jsonStr);
        view.loadUrl("javascript:renderCard('" + Define.ACCESS_TOKEN + "', '[" + jsonStr + "]')");
        super.onPageFinished(view, url);
    }
}
