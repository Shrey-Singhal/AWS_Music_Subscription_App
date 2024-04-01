package com.amazonaws.samples;

import java.io.File;
import java.util.Iterator;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
public class LoadMusicTable {
    public static void main(String[] args) throws Exception {

        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        DynamoDB dynamoDB = new DynamoDB(client);

        Table table = dynamoDB.getTable("music");

        JsonParser parser = new JsonFactory().createParser(new File("src/main/resources/a1.json"));
        JsonNode rootNode = new ObjectMapper().readTree(parser);

        JsonNode songsNode = rootNode.path("songs");
        Iterator<JsonNode> iter = songsNode.iterator();

        while (iter.hasNext()) {
            JsonNode currentNode = iter.next();

            String artist = currentNode.path("artist").asText();
            String title = currentNode.path("title").asText();
            String year = currentNode.path("year").asText();
            String web_url = currentNode.path("web_url").asText();
            String img_url = currentNode.path("img_url").asText();

            try {
                Item item = new Item()
                        .withPrimaryKey("artist", artist, "title", title)
                        .withString("year", year)
                        .withString("web_url", web_url)
                        .withString("img_url", img_url);

                table.putItem(item);
                System.out.println("PutItem succeeded: " + title + " by " + artist);

            } catch (Exception e) {
                System.err.println("Unable to add song: " + title + " by " + artist);
                System.err.println(e.getMessage());
                break;
            }
        }
        parser.close();
    }
}
