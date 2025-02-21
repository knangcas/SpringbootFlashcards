package com.FlashCardsSPA.model.exception;



public class FlashCardNotFoundResponse extends ErrorResponse {

    public FlashCardNotFoundResponse (String error) { __error = error;}

    private String __responseCode = "404 Not Found";

    private String __error;

    public String getResponseCode() {return __responseCode;}

    public void setResponseCode(String code) {
        __responseCode = code;
    }

    public String getError() {
        return __error;
    }

    public void setError(String error) {
        __error = error;
    }
}
