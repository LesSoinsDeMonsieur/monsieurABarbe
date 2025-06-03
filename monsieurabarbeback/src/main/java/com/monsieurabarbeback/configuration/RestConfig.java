package com.monsieurabarbeback.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        // Force le type de média par défaut à du JSON simple
        config.setDefaultMediaType(MediaType.APPLICATION_JSON);

        // Désactive l'utilisation du format HAL par défaut
        config.useHalAsDefaultJsonMediaType(false);
    }
}
