package com.encoredtech.devsample.listener;

import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;

import com.encoredtech.devsample.fragment.ApiFragment;
import com.encoredtech.devsample.fragment.CardFragment;

/**
 * Created by koansang on 2016. 2. 17..
 */
public class TabSelectListener implements TabLayout.OnTabSelectedListener {
    FragmentManager fragmentManager;

    public TabSelectListener(FragmentManager fragmentManager) {
        this.fragmentManager = fragmentManager;
    }

    @Override
    public void onTabSelected(TabLayout.Tab tab) {
        int position = tab.getPosition();

        Fragment selectTab = position == 0 ? new CardFragment() : new ApiFragment();

        //fragmentManager.beginTransaction().replace(R.id.container, selectTab).commit();
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {

    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }
}
