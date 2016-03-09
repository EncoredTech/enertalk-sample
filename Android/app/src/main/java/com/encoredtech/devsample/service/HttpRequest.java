package com.encoredtech.devsample.service;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by koansang on 2016. 2. 17..
 */
public class HttpRequest extends AsyncTask{
    private String request(String method, String urlStr, String authType, String token, JSONObject data) {
        String output = "";
        BufferedReader reader = null;
        HttpsURLConnection conn = null;

        try {
            URL url = new URL(urlStr);

            conn = (HttpsURLConnection) url.openConnection();

            if(conn != null) {
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");

                if(authType != null) {
                    conn.setRequestProperty("Authorization", authType + " " + token);
                }

                conn.setRequestMethod(method);
                conn.setConnectTimeout(10000);
                conn.setDoInput(true);

                if(method == "POST") {
                    conn.setDoOutput(true);
                    OutputStream os = conn.getOutputStream();
                    os.write(data.toString().getBytes("UTF-8"));
                    os.flush();
                    os.close();
                }
                else {

                }

                int resultCode = conn.getResponseCode();

                Log.i("resultCode", resultCode + "");

                if(resultCode == HttpURLConnection.HTTP_OK) {
                    reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

                    String line = null;
                    while (true) {
                        line = reader.readLine();

                        if (line == null) {
                            break;
                        }

                        output += line;
                    }

                    Log.i("Response", output);

                    reader.close();
                    conn.disconnect();
                }
                else {
                    Log.i("result message", conn.getResponseMessage());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return output;
    }

    @Override
    protected Object doInBackground(Object[] params) {
        String result =  request((String) params[0], (String) params[1], (String) params[2], (String) params[3], (JSONObject) params[4]);
        Object returnData = null;
        try {
            if(result != null && result.length() >= 0) {
                if(result.substring(0, 1).equals("{")) {
                    returnData = new JSONObject(result);
                }
                else if(result.substring(0, 1).equals("[")) {
                    returnData = new JSONArray(result);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return returnData;
    }


}
