package com.encoredtech.devsample.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.encoredtech.devsample.view.ListItemView;
import com.encoredtech.devsample.vo.ListItemVo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by koansang on 2016. 2. 25..
 */
public class ListItemAdapter extends BaseAdapter {
    private Context context;
    private List<ListItemVo> list = new ArrayList<ListItemVo>();

    public ListItemAdapter(Context context) {
        this.context = context;
    }

    public void addItem (ListItemVo item) {
        list.add(item);
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public ListItemVo getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ListItemView view;
        ListItemVo item = list.get(position);

        if(convertView == null) {
            view = new ListItemView(context, item);
        }
        else {
            view = (ListItemView) convertView;
        }


        view.setText(0, item.getName());
        view.setText(1, item.getDesc());

        return view;
    }
}
