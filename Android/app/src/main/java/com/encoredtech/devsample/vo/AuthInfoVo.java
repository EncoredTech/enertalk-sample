package com.encoredtech.devsample.vo;

/**
 * Created by koansang on 2016. 2. 15..
 */
public class AuthInfoVo {
    // TODO: fill in your client id and secret
    String client_id = "";
    String client_serect = "";
    String response_type = "code";
    String redirect_uri = "http://localhost/callback";
    String app_version = "web";
    String back_url = "/authorization";

    public AuthInfoVo(String client_id, String client_serect) {
        this.client_id = client_id;
        this.client_serect = client_serect;
    }

    public String getResponse_type() {
        return response_type;
    }

    public void setResponse_type(String response_type) {
        this.response_type = response_type;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getRedirect_uri() {
        return redirect_uri;
    }

    public void setRedirect_uri(String redirect_uri) {
        this.redirect_uri = redirect_uri;
    }

    public String getApp_version() {
        return app_version;
    }

    public void setApp_version(String app_version) {
        this.app_version = app_version;
    }

    public String getBack_url() {
        return back_url;
    }

    public void setBack_url(String back_url) {
        this.back_url = back_url;
    }

    public String getClient_serect() {
        return client_serect;
    }

    public void setClient_serect(String client_serect) {
        this.client_serect = client_serect;
    }
}
