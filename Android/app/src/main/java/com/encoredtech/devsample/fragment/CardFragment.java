package com.encoredtech.devsample.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import com.encoredtech.devsample.R;
import com.encoredtech.devsample.activity.CardDetailActivity;
import com.encoredtech.devsample.adapter.ListItemAdapter;
import com.encoredtech.devsample.service.AppUtils;
import com.encoredtech.devsample.service.Define;
import com.encoredtech.devsample.service.HttpRequest;
import com.encoredtech.devsample.vo.ListItemVo;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by koansang on 2016. 2. 16..
 */
public class CardFragment extends Fragment {
    ListItemAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.fragment_card, container, false);
        ListView listView = (ListView) rootView.findViewById(R.id.cardList);

        try {
            HttpRequest request = new HttpRequest();
            request.execute("GET", Define.CARD_DOMAIN + "/cards", null, null, null);
            JSONObject cardData = (JSONObject) request.get();
            JSONArray cardList = cardData.getJSONArray("detail");

            adapter = AppUtils.makeAdapter(cardList.toString(), getContext());
            listView.setAdapter(adapter);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    ListItemVo item = adapter.getItem(position);
                    Intent intent = new Intent(getContext(), CardDetailActivity.class);
                    intent.putExtra("id", item.getId());

                    startActivity(intent);
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rootView;
    }
}
