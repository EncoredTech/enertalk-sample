package com.encoredtech.devsample.service;

import android.content.Context;
import android.util.Log;

import com.encoredtech.devsample.adapter.ListItemAdapter;
import com.encoredtech.devsample.vo.ListItemVo;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.util.List;

/**
 * Created by koansang on 2016. 2. 15..
 */
public class AppUtils {
    public static String getUrlEncodeString(String key, String value) {
        String encodeStr = "";

        try {
            encodeStr = URLEncoder.encode(key, "UTF-8") + "=" + URLEncoder.encode(value, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            Log.e("Encode Error", e.getMessage());
        }

        return encodeStr;
    }

    public static Object sendRequest(String method, String urlStr, String authType, String token, String data) throws Exception {
        HttpRequest request = new HttpRequest();
        request.execute(method, urlStr, authType, token, data);

        String result = (String) request.get();
        Object returnData = null;

        if(result != null) {
            if(result.substring(0, 1).equals("{")) {
                returnData = new JSONObject(result);
            }
            else if(result.substring(0, 1).equals("[")) {
                returnData = new JSONArray(result);
            }
        }

        return returnData;
    }

    public static ListItemAdapter makeAdapter(String json, Context context) {
        ListItemAdapter adapter = new ListItemAdapter(context);

        Gson gson = new Gson();
        Type type = new TypeToken<List<ListItemVo>>(){}.getType();
        List<ListItemVo> list = gson.fromJson(json, type);

        for(ListItemVo item : list) {
            adapter.addItem(new ListItemVo(item.getName(), item.getDesc(), item.getId()));
        }

        return adapter;
    }
}
