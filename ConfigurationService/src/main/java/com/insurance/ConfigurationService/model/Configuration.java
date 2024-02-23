package com.insurance.ConfigurationService.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Configuration {
    String remoteEntry;
    String remoteName;
    String exposedModule;
    String outlet;
}
