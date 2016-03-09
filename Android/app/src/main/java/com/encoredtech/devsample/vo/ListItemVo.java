package com.encoredtech.devsample.vo;

import java.io.Serializable;

/**
 * Created by koansang on 2016. 2. 25..
 */
public class ListItemVo implements Serializable{
    private String name;
    private String desc;
    private String id;
    private String qs;

    public ListItemVo(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public ListItemVo(String name, String desc, String id) {
        this.name = name;
        this.desc = desc;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQs() {
        return qs;
    }

    public void setQs(String qs) {
        this.qs = qs;
    }
}
