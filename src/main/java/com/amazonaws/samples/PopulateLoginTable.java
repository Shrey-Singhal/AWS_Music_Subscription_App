package com.amazonaws.samples;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;

public class PopulateLoginTable {
    public static void main(String[] args) throws Exception {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("login");

        for (int i = 0; i < 10; i++) {
            String email = String.format("s3916734%d@student.rmit.edu.au", i);
            String userName = String.format("Shrey Singhal%d", i);
            String password = String.format("%d12345", i); // Simple pattern for demonstration; use a secure method for real passwords

            try {
                table.putItem(new Item()
                        .withPrimaryKey("email", email)
                        .withString("user_name", userName)
                        .withString("password", password));
                System.out.println("PutItem succeeded: " + email);
            } catch (Exception e) {
                System.err.println("Unable to add user: " + email);
                System.err.println(e.getMessage());
                break;
            }
        }

    }
}
