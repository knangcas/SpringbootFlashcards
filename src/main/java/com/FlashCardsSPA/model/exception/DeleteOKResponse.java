package com.FlashCardsSPA.model.exception;

public class DeleteOKResponse {

    public DeleteOKResponse(String response) {__response = response; __responseCode = "204 NO CONTENT";}
     String __responseCode;

     String __response;

    public String getResponseCode() { return __responseCode;}

    public void setResponseCode(String code) {
        __responseCode = code;
    }

    public String getError() {
        return __response;
    }

    public void setError(String error) {
        __response = error;
    }
}
