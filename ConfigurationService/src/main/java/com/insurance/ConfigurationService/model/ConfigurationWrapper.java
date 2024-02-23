package com.insurance.ConfigurationService.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ConfigurationWrapper {
    List<Configuration> configurationList;
}
