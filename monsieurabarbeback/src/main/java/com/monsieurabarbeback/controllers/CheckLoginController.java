package com.monsieurabarbeback.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/checklogin")
@RequiredArgsConstructor
public class CheckLoginController {
    
    @GetMapping
    public Boolean getLogin() {
        return true;
    }
    
}
