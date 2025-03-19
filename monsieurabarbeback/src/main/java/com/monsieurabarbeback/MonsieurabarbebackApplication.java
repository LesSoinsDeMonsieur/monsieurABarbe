package com.monsieurabarbeback;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class MonsieurabarbebackApplication {

	public static void main(String[] args) {
		SpringApplication.run(MonsieurabarbebackApplication.class, args);
	}

}
