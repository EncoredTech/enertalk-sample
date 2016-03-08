package com.encoredtech.devsample.service;

import android.content.res.AssetManager;
import android.os.AsyncTask;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by koansang on 2016. 3. 3..
 */
public class JsonReader extends AsyncTask {
    private AssetManager asset;

    public JsonReader(AssetManager asset) {
        this.asset = asset;
    }

    @Override
    protected Object doInBackground(Object[] params) {
        String json = "";
        try {
            //InputStream is = getActivity().getAssets().open("api.json");

            InputStream is = asset.open("api.json");
            BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));

            String line = null;

            while(true) {
                line = br.readLine();

                if(line == null) {
                    break;
                }

                json += line;
            }

            br.close();
            is.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return json;
    }
}
