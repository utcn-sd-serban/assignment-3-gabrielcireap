package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.seed.ApplicationSeed;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("e2e")
@RestController
@RequiredArgsConstructor
public class EndToEndTestsController {
    private final ApplicationSeed applicationSeed;

    @RequestMapping("/test/reseed")
    public void reseed(){
        applicationSeed.clear();
        applicationSeed.run();
    }
}
