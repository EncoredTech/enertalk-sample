package com.encoredtech.devsample.activity;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.widget.TextView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.service.Define;
import com.encoredtech.devsample.service.HttpRequest;
import com.encoredtech.devsample.vo.ListItemVo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by koansang on 2016. 3. 4..
 */
public class ApiDetailActivity extends AppCompatActivity {
    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return super.onSupportNavigateUp();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_api_detail);

        Toolbar toolbar = (Toolbar) findViewById(R.id.apiDetailToolbar);
        setSupportActionBar(toolbar);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayHomeAsUpEnabled(true);

    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        ListItemVo item = (ListItemVo) getIntent().getSerializableExtra("item");

        try {
            HttpRequest request = new HttpRequest();
            String requestUrl = Define.HOME_DOMAIN + item.getId().replace(":deviceId", Define.UUID);
            Log.i("URL", requestUrl);
            if(item.getQs() != null) {
                requestUrl += item.getQs();
            }
            request.execute("GET", requestUrl, "Bearer", Define.ACCESS_TOKEN, null);

            //String result = request.get().toString();

            TextView urlText = (TextView) findViewById(R.id.url);
            urlText.setText(item.getId());

            TextView paramsText = (TextView) findViewById(R.id.param);
            paramsText.setText(item.getQs());

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(request.get());

            TextView resultText = (TextView) findViewById(R.id.result);
            resultText.setText(json);
            resultText.setMovementMethod(new ScrollingMovementMethod());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
