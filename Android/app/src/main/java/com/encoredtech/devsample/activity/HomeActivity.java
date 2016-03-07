package com.encoredtech.devsample.activity;

import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.adapter.ViewPagerAdapter;
import com.encoredtech.devsample.service.Define;
import com.encoredtech.devsample.service.HttpRequest;

import org.json.JSONObject;

/**
 * Created by koansang on 2016. 2. 16..
 */
public class HomeActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayShowTitleEnabled(false);

        ViewPager viewPager = (ViewPager) findViewById(R.id.viewPager);
        viewPager.setAdapter(new ViewPagerAdapter(getSupportFragmentManager()));

        TabLayout tabs = (TabLayout) findViewById(R.id.tabs);
        tabs.setupWithViewPager(viewPager);
    }

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        String code = getIntent().getExtras().getString("code");

        try {
            JSONObject json = new JSONObject();
            json.put("client_id", Define.CLIENT_ID);
            json.put("client_secret", Define.CLIENT_SECRET);
            json.put("grant_type", "authorization_code");
            json.put("code", code);

            HttpRequest request = new HttpRequest();
            request.execute("POST", Define.AUTH_DOMAIN + "/token", "", "", json);

            JSONObject result = (JSONObject) request.get();

            Define.ACCESS_TOKEN = result.getString("access_token");

            request = new HttpRequest();
            request.execute("GET", Define.AUTH_DOMAIN + "/uuid", "Bearer", Define.ACCESS_TOKEN, null);
            result = (JSONObject) request.get();

            Define.UUID = result.getString("uuid");
            Log.i("Device UUId", Define.UUID);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
