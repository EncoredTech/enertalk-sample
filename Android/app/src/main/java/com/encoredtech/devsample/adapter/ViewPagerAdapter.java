package com.encoredtech.devsample.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.encoredtech.devsample.fragment.ApiFragment;
import com.encoredtech.devsample.fragment.CardFragment;

/**
 * Created by koansang on 2016. 2. 25..
 */
public class ViewPagerAdapter extends FragmentPagerAdapter {
    final int MAX_PAGE = 2;
    Fragment fragment;

    public ViewPagerAdapter(FragmentManager fm) {

         super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                fragment = new CardFragment();
                break;
            case 1:
                fragment = new ApiFragment();
                break;
        }

        return fragment;
    }

    @Override
    public int getCount() {

        return MAX_PAGE;
    }

    @Override
    public CharSequence getPageTitle(int position) {

        return position == 0 ? "Card" : "API";
    }
}
