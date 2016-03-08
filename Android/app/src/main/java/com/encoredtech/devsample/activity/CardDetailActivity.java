package com.encoredtech.devsample.activity;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.webkit.WebView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.listener.DetailWebViewListener;

/**
 * Created by koansang on 2016. 2. 26..
 */
public class CardDetailActivity extends AppCompatActivity {
    @Override
    public boolean onSupportNavigateUp() {
        finish();
        return super.onSupportNavigateUp();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_card_detail);
        String paramId = getIntent().getStringExtra("id");

        Toolbar toolbar = (Toolbar) findViewById(R.id.detailToolbar);
        setSupportActionBar(toolbar);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayShowTitleEnabled(false);
        actionBar.setDisplayHomeAsUpEnabled(true);

        WebView webView = (WebView) findViewById(R.id.cardView);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setBlockNetworkLoads(false);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new DetailWebViewListener(paramId));
        webView.loadUrl("file:///android_asset/index.html");


    }
}
