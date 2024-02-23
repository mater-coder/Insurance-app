package com.insurance.ConfigurationService.Controller;

import com.insurance.ConfigurationService.model.Configuration;
import com.insurance.ConfigurationService.model.ConfigurationWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ConfigController {

    @GetMapping(path = "/getConfig")
    public ResponseEntity<ConfigurationWrapper> getConfigurations(){
        List<Configuration> configurationList = new ArrayList<>();

        configurationList.add(new Configuration("https://insurance-name.netlify.app/remoteEntry.js","remoteApp","./CounterModule","app1","CounterModule"));
        configurationList.add(new Configuration("https://insurance-details.netlify.app/remoteEntry.js","remoteApp2","./MicrofrontendModule","app2","MicrofrontendModule"));

        ConfigurationWrapper configurationWrapper = new ConfigurationWrapper(configurationList);
        return new ResponseEntity<>(configurationWrapper, HttpStatus.OK);
    }
}
