package com.encoredtech.devsample.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.activity.ApiDetailActivity;
import com.encoredtech.devsample.adapter.ListItemAdapter;
import com.encoredtech.devsample.service.AppUtils;
import com.encoredtech.devsample.service.JsonReader;
import com.encoredtech.devsample.vo.ListItemVo;

import java.util.Date;

/**
 * Created by koansang on 2016. 2. 16..
 */
public class ApiFragment extends Fragment {
    ListItemAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.fragment_api, container, false);
        ListView listView = (ListView) rootView.findViewById(R.id.apiList);

        JsonReader reader = new JsonReader(getActivity().getAssets());
        reader.execute();
        try {
            String json = (String) reader.get();
            Log.i("JSON", json);
            adapter = AppUtils.makeAdapter(json, getContext());

            listView.setAdapter(adapter);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    ListItemVo item = adapter.getItem(position);
                    String params = "?";
                    if(position == 3 || position == 4) {
                        long now = new Date().getTime();
                        params += "period=hourly&";
                        params += "start=" + (now - (1000 * 60 * 60 * 6)) + "&";
                        params += "end=" + now;
                    }

                    item.setQs(params);
                    item.setQs(params);

                    Intent intent = new Intent(getContext(), ApiDetailActivity.class);
                    intent.putExtra("item", item);

                    startActivity(intent);
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rootView;
    }
}
