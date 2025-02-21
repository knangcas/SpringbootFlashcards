package com.FlashCardsSPA.model.exception;

public class ErrorResponse {

    public ErrorResponse() {}
     String __responseCode;

     String __error;

    public String getResponseCode() { return __responseCode;}

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
