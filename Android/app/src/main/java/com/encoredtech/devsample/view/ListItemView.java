package com.encoredtech.devsample.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.vo.ListItemVo;

/**
 * Created by koansang on 2016. 2. 25..
 */
public class ListItemView extends LinearLayout {
    TextView titleView;
    TextView descView;

    public ListItemView(Context context, ListItemVo item) {
        super(context);

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.layout_list, this, true);

        titleView = (TextView) findViewById(R.id.itemTitle);
        titleView.setText(item.getName());

        descView = (TextView) findViewById(R.id.itemPath);
        descView.setText(item.getDesc());
    }

    public void setText(int type, String text) {
        if(type == 0) {
            titleView.setText(text);
        }
        else {
            descView.setText(text);
        }
    }
}
