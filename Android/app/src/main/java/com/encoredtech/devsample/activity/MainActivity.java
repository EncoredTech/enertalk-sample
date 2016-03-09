package com.encoredtech.devsample.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.service.Define;
import com.encoredtech.devsample.vo.AuthInfoVo;

public class MainActivity extends AppCompatActivity {
    public static final int LOGIN_VIEW_CODE = 1001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button signBtn = (Button) findViewById(R.id.signBtn);
        signBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Define.AUTH_INFO = new AuthInfoVo(Define.CLIENT_ID, Define.CLIENT_SECRET);

                Intent intent = new Intent(getApplicationContext(), SignInActivity.class);
                startActivityForResult(intent, LOGIN_VIEW_CODE);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode == RESULT_OK) {
            try {
                String code = data.getExtras().getString("code");
                Intent intent = new Intent(getApplicationContext(), HomeActivity.class);
                intent.putExtra("code", code);
                startActivity(intent);
                finish();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}
